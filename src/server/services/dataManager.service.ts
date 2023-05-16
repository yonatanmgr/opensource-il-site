import { logger } from '../utils/logger';
import { ReademGithubCompany, ReademGithubProject } from '@/types/index.type';
import { getRedisVal, setRedisVal } from '../db/redis-vercel-kv';

export const JSON_DATA_STORE_KEY = 'jsonData';
export const COMPANIES_STORE_KEY = 'companies';
export const PROJECTS_STORE_KEY = 'projects';

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
    const allProjects: string[] = [];
    const allComps: string[] = [];

    const compsStr = (rawReadmeFile.match(compsTitleRegex) as string[])[0];
    const langsStr = (rawReadmeFile.match(projectsTitleRegex) as string[])[0];

    const compsList = compsStr.match(findListItemRegex);
    const allLanguages = langsStr.match(langsToListRegex);

    compsList?.forEach((company) => {
      allComps.push(company.match(splitCompanyRegex) as unknown as string);
    });

    allLanguages?.forEach((lang) => {
      allProjects.push(lang.match(findListItemRegex) as unknown as string);
    });

    const parsedAllComps = allComps
      .map((company: string) => {
        if (company[2].split('/').includes('github.com')) {
          return { name: company[2].replace('https://github.com/', '') };
        }
      })
      .filter(
        (company: ReademGithubCompany | undefined) => company != undefined
      );

    const parsedAllProjects = allProjects
      .flat()
      .map((projectStr: string) => {
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
            parsedAllComps.push({ name: res[2].split('/')[3] });
          }
        }
      })
      .filter(
        (project: ReademGithubProject | undefined) => project != undefined
      );

    return {
      success: true,
      allComps: parsedAllComps as unknown as ReademGithubCompany[],
      allProjects: parsedAllProjects as unknown as ReademGithubProject[],
      allLanguages
    };
  } catch (error) {
    logger.error(
      '🚀 ~ file: githubMdParser.ts:5 ~ githubMdParser ~ error:',
      error
    );
    return { success: false, allComps: [], allProjects: [], allLanguages: [] };
  }
}

export async function fetchGithubMd() {
  'use server';
  const readmeUrl =
    'https://raw.githubusercontent.com/lirantal/awesome-opensource-israel/master/README.md';

  try {
    const repsonse = await fetch(readmeUrl).then((res) => res.text());
    return repsonse;
  } catch (error) {
    logger.error(
      '🚀 ~ file: githubMdParser.ts:93 ~ fetchGithubMd ~ error:',
      error
    );

    return null;
  }
}

async function getCompany(company: { name: string }) {
  const gqlBody: { query: string; variables: { login: string } } = {
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

  return await fetch('https://api.github.com/graphql', {
    method: 'POST',
    mode: 'cors',
    headers: headersList,
    body: JSON.stringify(gqlBody)
  }).then((res) => {
    const gqlResult = res.json();
    logger.info(
      '🚀 ~ file: dataManager.service.ts:162 ~ getCompany ~ gqlResult:',
      {
        company,
        gqlResult
      }
    );
    return gqlResult;
  });
}

async function getProject(project: { name: string }) {
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

  return await fetch('https://api.github.com/graphql', {
    method: 'POST',
    mode: 'cors',
    headers: headersList,
    body: JSON.stringify(gqlBody)
  }).then((res) => {
    const gqlResult = res.json();
    logger.info(
      '🚀 ~ file: dataManager.service.ts:212 ~ getProject ~ gqlResult:',
      {
        project,
        gqlResult
      }
    );
    return gqlResult;
  });
}

export async function fetchProjects(
  allProjects: { name: string; description: string }[]
) {
  const requests: any[] = [];
  const results: any[] = [];

  allProjects.forEach((project: { name: string; description: string }) => {
    requests.push(getProject(project));
  });

  return await new Promise((resolve) => {
    Promise.all(requests)
      .then((proms) => proms.forEach((p) => results.push(p.data)))
      .then(() => resolve(results));
  });

  // const allResponses = await Promise.allSettled(requests);

  // for (const response of allResponses) {
  //   if (response.status === 'fulfilled') {
  //     console.log(
  //       '🚀 ~ file: dataManager.service.ts:288 ~ response:',
  //       response
  //     );
  //     results.push(response.value.data);
  //   } else {
  //     console.error(response.reason);
  //   }
  // }

  // return results;
}

export async function fetchComps(allComps: { name: string }[]) {
  const requests: any[] = [];
  const results: any[] = [];

  allComps.forEach((company: { name: string }) => {
    requests.push(getCompany(company));
  });
  return await new Promise((resolve) => {
    Promise.all(requests)
      .then((proms) => proms.forEach((p) => results.push(p.data)))
      .then(() => resolve(results));
  });
}

export async function mainDataFetch() {
  let isFromDB = false;
  try {
    logger.info('Initiating search for existing store in memory...');

    const dbData: any = await getRedisVal(JSON_DATA_STORE_KEY);
    if (dbData) {
      const {
        success,
        allComps,
        allGqlProjects,
        allGqlCompanies,
        allLanguages,
        createDate
      } = dbData;
      isFromDB = true;
      return {
        success,
        allComps,
        projects: allGqlProjects.filter((project: any) => project !== null),
        companies: allGqlCompanies,
        allLanguages,
        isFromDB,
        createDate
      };
    }

    logger.info('Fetching from github...');
    const result = await fetchGithubMd();
    if (!result) {
      throw new Error('Failed to fetch from github readme!');
    }
    const { success, allComps, allLanguages, allProjects } =
      githubMdParser(result);
    if (
      !success ||
      !allComps.length ||
      !allLanguages?.length ||
      !allProjects.length
    ) {
      throw new Error('Error parsing readme from github');
    }

    const allGqlCompanies: any = await fetchComps(allComps);
    if (!allGqlCompanies.length) {
      throw new Error('Error fetching GQL companies');
    }
    const allGqlProjects: any = await fetchProjects(allProjects);
    if (!allGqlProjects.length) {
      throw new Error('Error fetching GQL projects');
    }

    const saveResult = await setRedisVal(JSON_DATA_STORE_KEY, {
      success,
      allComps,
      allGqlProjects,
      allGqlCompanies,
      allLanguages,
      createDate: new Date()
    });

    if (saveResult !== 'OK') {
      throw new Error('store in KV REDIS failed!');
    }

    logger.info('Setting to memory...');

    return {
      success,
      allComps,
      projects: allGqlProjects,
      companies: allGqlCompanies,
      allLanguages,
      saveResult,
      isFromDB,
      createDate: new Date()
    };
  } catch (error) {
    logger.error(
      '🚀 ~ file: githubMdParser.ts:235 ~ CronSingleTon ~ getData ~ error:',
      error
    );
  }
}

export async function fetchCompany(companyId: string) {
  try {
    await mainDataFetch();
    const companies = await mainDataFetch().then((data) => data?.companies);
    const target = companies.find(
      (company: any) => company?.organization?.login === companyId
    );
    return target !== -1 ? target : null;
  } catch (error) {
    logger.error(
      '🚀 ~ file: dataManager.service.ts:397 ~ fetchCompany ~ error:',
      error
    );
  }
}

export async function fetchAllCompanies() {
  try {
    return await mainDataFetch().then((data) => data?.companies);
  } catch (error) {
    logger.error(
      '🚀 ~ file: dataManager.service.ts:416 ~ fetchAllCompanies ~ error:',
      error
    );
  }
}

export async function fetchAllRepositories() {
  try {
    return await mainDataFetch().then((data) => data?.projects);
  } catch (error) {
    logger.error(
      '🚀 ~ file: dataManager.service.ts:429 ~ fetchAllRepositories ~ error:',
      error
    );
  }
}
