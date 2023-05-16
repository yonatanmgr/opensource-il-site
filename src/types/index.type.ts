export type ReademGithubCompany = { name: string };
export type ReademGithubProject = { name: string; description: string };

export type RepoProps = {
  openIssues: {
    totalCount: number;
  };
  stargazerCount: number;
  nameWithOwner: string;
  languages: {
    totalSize: number;
    edges: {
      size: number;
      node: {
        name: string;
      };
    }[];
  };
  openGraphImageUrl: string;
  description: string | null;
  defaultBranchRef: {
    target: {
      committedDate: string;
    };
  };
};

export type Views = 'repos' | 'companies';

export type DataProps = {
  id: string;
  image: string;
  owner: string;
  name: string;
  description: string;
  lastCommit: string;
  stars: number;
  issuesCount: number;
  languages: {
    name: string;
    size: number;
  }[];
  totalSize: number;
};

export type CompanyProps = {
  name: string;
  login: string;
  avatar: string;
};
