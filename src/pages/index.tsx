import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Project from "@/components/Project";
import React, { useEffect, useState } from "react";

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

type DataProps = {
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
};
type orgProps = {
  name: string;
  login: string;
  repositories: {
    nodes: RepoProps[];
  };
};

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("");
  const [readme, setReadme] = useState("");
  const [readmePreview, setReadmePreview] = useState("");
  const [sortFunction, setSortFunction] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch("https://os-il-api.vercel.app/api/reposdb")
      .then((res) => res.json())
      .then((data) => {
        setData(
          (data as { repository: RepoProps }[]).map((proj) => {
            const repo = proj.repository;

            const nameWithOwner = repo.nameWithOwner;
            const image = repo.openGraphImageUrl;
            const description = repo.description;
            const lastCommit = repo.defaultBranchRef.target.committedDate;
            const stargazerCount = repo.stargazerCount;
            const issuesCount = repo.openIssues.totalCount;
            const languages = repo.languages.edges.map((lang) => ({
              name: lang.node.name,
              size: lang.size,
            }));

            return {
              image: image,
              owner: nameWithOwner.split("/")[0],
              name: nameWithOwner.split("/")[1],
              description: description,
              lastCommit: lastCommit,
              stars: stargazerCount,
              issuesCount: issuesCount,
              languages: languages,
            };
          })
        );
        setLoading(false);
        const placeholder = `<div className="readmePreview">Click a repository to view its README.md</div>`;
        setReadmePreview(placeholder);
      });
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
  }, [data]);

  useEffect(() => {
    let sorted;
    switch (sortFunction) {
      case "lastCommit":
        sorted = [...data].sort((b: DataProps, a: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case "lastCommitReverse":
        sorted = [...data].sort((a: DataProps, b: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case "stars":
        sorted = [...data].sort(
          (b: DataProps, a: DataProps) => a.stars - b.stars
        );
        break;
      case "starsReverse":
        sorted = [...data].sort(
          (a: DataProps, b: DataProps) => a.stars - b.stars
        );
        break;
      case "issues":
        sorted = [...data].sort(
          (b: DataProps, a: DataProps) => a.issuesCount - b.issuesCount
        );
        break;
      case "issuesReverse":
        sorted = [...data].sort(
          (a: DataProps, b: DataProps) => a.issuesCount - b.issuesCount
        );
        break;

      default:
        sorted = [...data];
        break;
    }
    setData(sorted);
  }, [sortFunction]);

  useEffect(() => {
    if (selectedLang == "") {
      fetch("https://os-il-api.vercel.app/api/reposdb")
        .then((res) => res.json())
        .then((data) => {
          setData(
            (data as { repository: RepoProps }[]).map((proj) => {
              const repo = proj.repository;

              const nameWithOwner = repo.nameWithOwner;
              const image = repo.openGraphImageUrl;
              const description = repo.description;
              const lastCommit = repo.defaultBranchRef.target.committedDate;
              const stargazerCount = repo.stargazerCount;
              const issuesCount = repo.openIssues.totalCount;
              const languages = repo.languages.edges.map((lang) => ({
                name: lang.node.name,
                size: lang.size,
              }));

              return {
                image: image,
                owner: nameWithOwner.split("/")[0],
                name: nameWithOwner.split("/")[1],
                description: description,
                lastCommit: lastCommit,
                stars: stargazerCount,
                issuesCount: issuesCount,
                languages: languages,
              };
            })
          );
        });
    } else {
      setData(
        data.filter((repo: DataProps) =>
          repo.languages.find((language) => language.name == selectedLang)
        )
      );
    }
  }, [selectedLang]);

  useEffect(() => {
    const foundReadme = data.find(
      (repo) => `https://www.github.com/${repo.owner}/${repo.name}` == readme
    );
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

  if (isLoading) return <div className="center"></div>;
  if (!data) return <p>Error loading data</p>;

  return (
    <>
      <Head>
        <title>קוד פתוח ישראלי</title>
        <meta name="description" content="Open Source Community Israel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="pageTop">
          <div className="titleBar">
            <div className="pageTitle">פרויקטי קוד פתוח ישראלים</div>
            <div className="socialLinks">
              <a
                rel="noopener"
                title="github"
                href="https://github.com/lirantal/awesome-opensource-israel"
                target="_blank"
                className="socialLink"
              >
                <svg
                  height="30"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="30"
                >
                  <path
                    d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                    fill="white"
                  ></path>
                </svg>
              </a>
              <a
                rel="noopener"
                title="facebook"
                href="https://www.facebook.com/groups/PullRequest"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 40 40"
                  fill="white"
                  className="socialLink"
                  height="30"
                  width="30"
                >
                  <path d="M16.7,39.8C7.2,38.1,0,29.9,0,20C0,9,9,0,20,0s20,9,20,20c0,9.9-7.2,18.1-16.7,19.8l-1.1-0.9h-4.4L16.7,39.8z" />
                  <path
                    d="M27.8,25.6l0.9-5.6h-5.3v-3.9c0-1.6,0.6-2.8,3-2.8h2.6V8.2c-1.4-0.2-3-0.4-4.4-0.4c-4.6,0-7.8,2.8-7.8,7.8V20  h-5v5.6h5v14.1c1.1,0.2,2.2,0.3,3.3,0.3c1.1,0,2.2-0.1,3.3-0.3V25.6H27.8z"
                    fill="hsl(222, 80%, 5%)"
                  />
                </svg>
              </a>
              <a
                rel="noopener"
                title="discord"
                href="https://discord.com/invite/ZmChMVZxpU"
                target="_blank"
                className="socialLink"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 -35 256 256"
                  version="1.1"
                >
                  <g>
                    <path
                      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                      fill="#fff"
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>
          <div className="filters">
            <span className="filtersText">מסננים (קליק ימני - סדר הפוך): </span>
            <button
              onClick={(e) => {
                e.currentTarget.innerHTML =
                  "מיון לפי זמן גרסה אחרונה (מהחדש לישן)";
                setSortFunction("lastCommit");
              }}
              onContextMenu={(e) => {
                e.currentTarget.innerHTML =
                  "מיון לפי זמן גרסה אחרונה (מהישן לחדש)";
                e.preventDefault();
                setSortFunction("lastCommitReverse");
              }}
            >
              מיון לפי זמן גרסה אחרונה
            </button>
            <button
              onClick={(e) => {
                e.currentTarget.innerHTML = "מיון לפי כמות כוכבים";
                setSortFunction("stars");
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.currentTarget.innerHTML = "מיון לפי כמות כוכבים (סדר עולה)";
                setSortFunction("starsReverse");
              }}
            >
              מיון לפי כמות כוכבים
            </button>
            <button
              onClick={(e) => {
                e.currentTarget.innerHTML = "מיון לפי כמות Issues פתוחים";
                setSortFunction("issues");
              }}
              onContextMenu={(e) => {
                e.currentTarget.innerHTML =
                  "מיון לפי כמות Issues פתוחים (סדר עולה)";
                e.preventDefault();
                setSortFunction("issuesReverse");
              }}
            >
              מיון לפי כמות Issues פתוחים
            </button>
            <select
              name="languages"
              id="selectLang"
              title="סינון לפי שפה"
              onChange={(e) => {
                setSelectedLang(e.currentTarget.value);
              }}
            >
              <option value="">בחרו שפה...</option>
              {langs.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mainContent">
          <div className="projectGrid">
            {data.map((proj) => {
              return (
                <Project
                  setReadme={setReadme}
                  image={proj.image}
                  name={proj.name}
                  owner={proj.owner}
                  stars={proj.stars}
                  lastCommit={proj.lastCommit}
                  issuesCount={proj.issuesCount}
                  description={proj.description}
                  url={`https://www.github.com/${proj.owner}/${proj.name}`}
                  key={proj.image}
                  languages={proj.languages}
                />
              );
            })}
          </div>
          <div
            className="previewPage markdown-body"
            dangerouslySetInnerHTML={{ __html: readmePreview }}
          ></div>
        </div>
      </main>
    </>
  );
}
