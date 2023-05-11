import { axiosInstance } from './axiosInstance';
import { logger } from './logger';

const langsToListRegex = /^\s?#{3}([^#{3}]+?)\n([^]+?)(?=^\s?#{3}[^#{3}])/gm;
const splitProjectRegex = /\[(.+)\]\((.+)\) - (.+)/;
const splitCompanyRegex = /\[(.+)\]\((.+)\)/;
const cleanBadgesRegex = /!\[(.+)\]\(.+\)/;
const findListItemRegex = /(?<=\* ).*/gm;
const projectsTitleRegex =
  /(?:^|\n)## Projects by main language\s?[^\n]*\n(.*?)(?=\n##?\s|$)/gs;
const compsTitleRegex = /(?:^|\n)## Companies\s?[^\n]*\n(.*?)(?=\n##?\s|$)/gs;

const headersList = {
  Accept: '*/*',
  Authorization: 'bearer ' + process.env.github_read_only,
  'Content-Type': 'application/json'
};

export function githubMdParser(rawReadmeFile: string) {
  try {
    let allProjects: any[] = [];
    let allComps: any[] = [];

    const compsStr = (rawReadmeFile.match(compsTitleRegex) as string[])[0];
    const langsStr = (rawReadmeFile.match(projectsTitleRegex) as string[])[0];

    const compsList = compsStr.match(findListItemRegex);
    const allLanguages = langsStr.match(langsToListRegex);

    compsList?.forEach((company) => {
      allComps.push(company.match(splitCompanyRegex));
    });

    allLanguages?.forEach((lang) => {
      allProjects.push(lang.match(findListItemRegex));
    });

    allComps = allComps
      .map((company) => {
        if (company[2].split('/').includes('github.com')) {
          return { name: company[2].replace('https://github.com/', '') };
        }
      })
      .filter((comp) => comp != undefined);

    allProjects = allProjects
      .flat()
      .map((projectStr) => {
        const res = projectStr.match(splitProjectRegex);

        // Checking if rawReadmeFile exists and if it is a GitHub url
        if (res && res[2].split('/').includes('github.com')) {
          // Checking if rawReadmeFile is a repo. Else, add to companies
          if (res[2].split('/').length > 4) {
            const name = res[2].replace('https://github.com/', '');
            return {
              name: name,
              description: res[3].replace(cleanBadgesRegex, '')
            };
          } else {
            allComps.push({ name: res[2].split('/')[3] });
          }
        }
      })
      .filter((project) => project != undefined);

    return { allComps, allProjects, allLanguages };
  } catch (error) {
    logger.error(
      '🚀 ~ file: githubMdParser.ts:5 ~ githubMdParser ~ error:',
      error
    );
  }
}

export async function fetchGithubMd() {
  const readmeUrl =
    'https://raw.githubusercontent.com/lirantal/awesome-opensource-israel/master/README.md';

  try {
    return await axiosInstance.get(readmeUrl);
  } catch (error) {
    logger.error(
      '🚀 ~ file: githubMdParser.ts:77 ~ fetchGithubMd ~ error:',
      error
    );
  }
}

export async function fetchProjects(allProjects: any) {
  const requests: any[] = [];
  const results: any[] = [];

  allProjects.forEach((project: any) => {
    const gqlBody = {
      query: `query ($repoOwner: String!, $repoName: String!) {
      repository(owner: $repoOwner, name: $repoName) {
        openIssues: issues(states:OPEN) {
          totalCount
        }
        stargazerCount
        nameWithOwner
        languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
          totalSize
          edges {
            size
            node {
              name
            }
          }
        }
        openGraphImageUrl
        description
        defaultBranchRef {
          target {
            ... on Commit {
              committedDate
            }
          }
        }
      }
    }
    `,
      variables: {
        repoOwner: project.name.split('/')[0],
        repoName: project.name.split('/')[1]
      }
    };

    const promise = fetch('https://api.github.com/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: headersList,
      body: JSON.stringify(gqlBody)
    }).then((res) => res.json());
    requests.push(promise);
  });
  return new Promise((resolve) => {
    Promise.all(requests)
      .then((proms) => proms.forEach((p) => results.push(p.data)))
      .then(() => resolve(results));
  });
}

export async function fetchComps(allComps: any) {
  const requests: any[] = [];
  const results: any[] = [];

  allComps.forEach((company: any) => {
    const gqlBody: any = {
      query: `query ($login: String!) {
      organization(login: $login) {
        name
        avatarUrl
        login
        repositories(
          first: 100
          isLocked: false
          isFork: false
          privacy: PUBLIC
          orderBy: {direction: DESC, field: STARGAZERS}
        ) {
          nodes {
            openIssues: issues(states:OPEN) {
              totalCount
            }
            stargazerCount
            nameWithOwner
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              totalSize
              edges {
                size
                node {
                  name
                }
              }
            }
            openGraphImageUrl
            description
            defaultBranchRef {
              target {
                ... on Commit {
                  committedDate
                }
              }
            }
          }
        }
      }
    }`,
      variables: { login: company.name }
    };

    const promise = fetch('https://api.github.com/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: headersList,
      body: JSON.stringify(gqlBody)
    }).then((res) => res.json());
    requests.push(promise);
  });
  return new Promise((resolve) => {
    Promise.all(requests)
      .then((proms) => proms.forEach((p) => results.push(p.data)))
      .then(() => resolve(results));
  });
}
