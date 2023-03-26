import Head from "next/head";
import React, { useEffect, useState } from "react";
import ReadmePreview from "@/components/MainContent/ReadmePreview";
import ReposList from "@/components/MainContent/ReposList/ReposList";
import PageTitle from "@/components/Header/PageTitle";
import Filters from "@/components/Header/Filters";
import CompaniesList from "@/components/MainContent/CompaniesList";

type RepoProps = {
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

export type DataProps = {
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

export default function Home() {
  const [view, setView] = useState("repos");
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [data, setData] = useState<DataProps[]>([]);
  const [showData, setShowData] = useState<DataProps[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("");
  const [readme, setReadme] = useState("");
  const [currentCompany, setCurrentCompany] = useState<string>();
  const [readmePreview, setReadmePreview] = useState("");
  const [sortFunction, setSortFunction] = useState("");

  const fetchCompanies = () => {
    fetch("https://os-il-api.vercel.app/api/allcomps")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });
  };

  const fetchRepos = () => {
    fetch("https://os-il-api.vercel.app/api/reposdb")
      .then((res) => res.json())
      .then((data) => {
        setData(
          (data as { repository: RepoProps }[]).map((proj) => {
            const repo = proj.repository;

            const nameWithOwner = repo.nameWithOwner;
            const image = repo.openGraphImageUrl;
            const description = repo.description ?? "";
            const lastCommit = repo.defaultBranchRef
              ? repo.defaultBranchRef.target.committedDate
              : "1970-01-01T00:00:00Z";
            const stargazerCount = repo.stargazerCount;
            const issuesCount = repo.openIssues.totalCount;
            const languages = repo.languages.edges.map((lang) => ({
              name: lang.node.name,
              size: lang.size,
            }));
            const totalSize = repo.languages.totalSize;

            return {
              image: image,
              owner: nameWithOwner.split("/")[0],
              name: nameWithOwner.split("/")[1],
              description: description,
              lastCommit: lastCommit,
              stars: stargazerCount,
              issuesCount: issuesCount,
              languages: languages,
              totalSize: totalSize,
            };
          })
        );
        setLoading(false);
        const placeholder = `<div>Click a repository to view its README.md</div>`;
        setReadmePreview(placeholder);
      });
  };

  const fetchCompanyRepos = (company: string) => {
    if (currentCompany) {
      setLoading(true);
      fetch(`https://os-il-api.vercel.app/api/company/${company}`)
        .then((res) => res.json())
        .then((data) => {
          setShowData(
            (data.organization.repositories.nodes as RepoProps[])
              .map((repo) => {
                const nameWithOwner = repo.nameWithOwner;
                const image = repo.openGraphImageUrl;
                const description = repo.description ?? "";
                const lastCommit = repo.defaultBranchRef
                  ? repo.defaultBranchRef.target.committedDate
                  : "1970-01-01T00:00:00Z";
                const stargazerCount = repo.stargazerCount;
                const issuesCount = repo.openIssues.totalCount;
                const languages = repo.languages.edges.map((lang) => ({
                  name: lang.node.name,
                  size: lang.size,
                }));
                const totalSize = repo.languages.totalSize;

                return {
                  image: image,
                  owner: nameWithOwner.split("/")[0],
                  name: nameWithOwner.split("/")[1],
                  description: description,
                  lastCommit: lastCommit,
                  stars: stargazerCount,
                  issuesCount: issuesCount,
                  languages: languages,
                  totalSize: totalSize,
                };
              })
              .filter((repo: DataProps) => repo.name != ".github")
          );
          setView("repos");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRepos();
    fetchCompanies();
  }, []);

  useEffect(() => {
    const allLangs: string[] = [];
    data.forEach((repo: DataProps) => {
      if (repo.languages) {
        repo.languages.forEach((lang) => {
          if (!allLangs.includes(lang.name) && lang.name != "Dockerfile")
            allLangs.push(lang.name);
        });
      }
    });
    setLangs(allLangs);
    setShowData(data);
  }, [data]);

  useEffect(() => {
    let sorted;
    switch (sortFunction) {
      case "lastCommit":
        sorted = [...showData].sort((b: DataProps, a: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case "lastCommitReverse":
        sorted = [...showData].sort((a: DataProps, b: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case "stars":
        sorted = [...showData].sort(
          (b: DataProps, a: DataProps) => a.stars - b.stars
        );
        break;
      case "starsReverse":
        sorted = [...showData].sort(
          (a: DataProps, b: DataProps) => a.stars - b.stars
        );
        break;
      case "issues":
        sorted = [...showData].sort(
          (b: DataProps, a: DataProps) => a.issuesCount - b.issuesCount
        );
        break;
      case "issuesReverse":
        sorted = [...showData].sort(
          (a: DataProps, b: DataProps) => a.issuesCount - b.issuesCount
        );
        break;

      default:
        sorted = [...showData];
        break;
    }
    setShowData(sorted);
  }, [sortFunction]);

  useEffect(() => {
    if (selectedLang == "") setShowData(data);
    else {
      setShowData(
        data.filter((repo: DataProps) =>
          repo.languages.find((language) => language.name == selectedLang)
        )
      );
    }
  }, [selectedLang]);

  useEffect(() => {
    if (currentCompany) fetchCompanyRepos(currentCompany);
  }, [currentCompany]);

  useEffect(() => {
    const foundReadme = showData.find(
      (repo) => `https://www.github.com/${repo.owner}/${repo.name}` == readme
    );
    console.log(readme);
    if (foundReadme) {
      fetch(
        `https://api.github.com/repos/${foundReadme.owner}/${foundReadme.name}/readme`
      )
        .then((res) => res.json())
        .then((data) => {
          fetch(data.download_url)
            .then((res) => res.text())
            .then((data) => {
              var showdown = require("showdown"),
                converter = new showdown.Converter(),
                text = data,
                html = converter.makeHtml(text);
              setReadmePreview(html);
            });
        });
    }
  }, [data, readme]);

  let loader;
  if (isLoading)
    loader = (
      <div className="absolute w-screen h-screen bg-black/50">
        <div className="center h-10 w-10 border-8 border-mydarkblue border-t-myblue bg-transparent fixed left-[49%] top-[45%] rounded-full animate-spin"></div>
      </div>
    );
  else {
    loader = <></>;
  }
  if (!data) return <p>Error loading data</p>;

  return (
    <>
      <Head>
        <title>קוד פתוח ישראלי</title>
        <meta name="description" content="Open Source Community Israel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loader}
      <main className="md:p-16 sm:p-8 p-6 pb-0 sm:pb-0 md:pb-0 flex flex-col justify-between items-center  min-h-screen max-h-screen">
        <div
          className="flex flex-col w-full gap-2.5"
          onDoubleClick={() => {
            if (view == "repos") {
              setView("companies");
            } else {
              setCurrentCompany("");
              setShowData(data);
              setView("repos");
            }
          }}
        >
          <PageTitle />
          <Filters
            setSelectedLang={setSelectedLang}
            setSortFunction={setSortFunction}
            langs={langs}
          />
        </div>
        <div
          dir="rtl"
          className="w-full h-screen flex overflow-y-auto flex-row justify-between gap-2.5"
        >
          {
            {
              repos: <ReposList setReadme={setReadme} showData={showData} />,
              companies: (
                <CompaniesList
                  companies={companies}
                  setComp={setCurrentCompany}
                />
              ),
            }[view]
          }
          <ReadmePreview readmePreview={readmePreview} />
        </div>
      </main>
    </>
  );
}
