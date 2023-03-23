import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Project from "@/components/Project";
import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import ReactTable from "@/components/Table";

type RepoProps = {
  nameWithOwner: string;
  languages: {
    edges: {
      size: number;
      node: { name: string };
    }[];
  };
  openGraphImageUrl: string;
  pushedAt: string;
  shortDescriptionHTML: string;
  upcase?: { text: string } | null;
};

type orgProps = {
  repositories: {
    nodes: RepoProps[];
  };
};

export type RepoColumns = {
  name: string;
  owner: string;
  description: string;
  lastCommit: string;
};

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [table, setTable] = useState<React.ReactElement>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://os-il-api.vercel.app/api/reposdb")
      .then((res) => res.json())
      .then((data) => {
        
        setData((data as {repository: RepoProps}[]).map((proj) => {
          const projectObject = proj.repository;
          const projectOwner = projectObject.nameWithOwner.split("/")[0];
          const projectName = projectObject.nameWithOwner.split("/")[1];
          const projectDescription = projectObject.shortDescriptionHTML;
          const projectLastCommit = projectObject.pushedAt

          return {
            "owner": projectOwner,
            "name": projectName,
            "description": projectDescription,
            "lastCommit": projectLastCommit,
          };
        }));
      });
  }, []);

  useEffect(() => {
    setLoading(false);
    // console.log(data);
    setTable(<ReactTable repoData={data}/>);
  }, [data]);


  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <Head>
        <title>קוד פתוח ישראלי</title>
        <meta name="description" content="Open Source Community Israel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_app">
        <div className="pageTop">
          <div className="pageTitle">פרויקטי קוד פתוח ישראלים</div>
          <div className="socialLinks">
            <a
              rel="noopener"
              title="github"
              href="https://github.com/lirantal/awesome-opensource-israel"
              target="_blank"
              className="socialLink"
            >
              <img
                height={30}
                src="https://www.nicepng.com/png/full/52-520535_free-files-github-github-icon-png-white.png"
                alt="github"
              />
            </a>
            <a
              rel="noopener"
              title="facebook"
              href="https://www.facebook.com/groups/PullRequest"
              target="_blank"
              className="socialLink"
            >
              <img
                height={30}
                src="https://sgwlawfirm.com/wp-content/uploads/2020/12/Facebook_Icon_White.png"
                alt="facebook"
              />
            </a>
            <a
              rel="noopener"
              title="discord"
              href="https://discord.com/invite/ZmChMVZxpU"
              target="_blank"
              className="socialLink"
            >
              <img
                height={30}
                src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png"
                alt="discord"
              />
            </a>
          </div>
        </div>
        {table}
        {/* <div className="langsList">
          {data.map((lang) => {
            return (
              <div key={lang.language} className="language">
                <h1>{lang.language}</h1>
                <div className="projectGrid">
                  {lang.projects.map((proj) => (
                    <Project
                      image="https://assets-global.website-files.com/6207f5adfd8e615d3d70498b/6261753e28b7772bcf0266a0_Github%20comp.png"
                      name={proj.name}
                      description={proj.desc}
                      url={proj.url}
                      key={proj.url}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div> */}
      </main>
    </>
  );
}
