import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Project from "@/components/Project";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type ProjProps = {
  name: string;
  url: string;
  desc: string;
};

type LangProps = {
  language: string;
  projects: ProjProps[];
};

export default function Home() {
  const [data, setData] = useState<LangProps[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/lirantal/awesome-opensource-israel/master/README.md"
    )
      .then((res) => res.text())
      .then((data) => {
        const processHeader = (data: string) => {
          const getTitle = /(?<=#{3} ).*/gm;

          const temp = data.match(
            /^\s?#{3}([^#{3}]+?)\n([^]+?)(?=^\s?#{3}[^#{3}])/gm
          );

          const processLinks = (headerContent: string) => {
            const parseLink = (proj: string) => {
              const res = proj.match(
                /\[(.+)\]\((.+)\) - (.+)/
              ) as RegExpMatchArray;

              if (res) {
                const [, name, url, desc] = res;
                const cleanDesc = (desc: string) => {
                  return desc.replace(/!\[(.+)\]\(.+\)/, "");
                };
                return {
                  name: name,
                  url: url,
                  desc: cleanDesc(desc).trim(),
                };
              } else
                return {
                  name: "ERR",
                  url: "ERR",
                  desc: "ERR",
                };
            };

            const contMatch = headerContent.match(/(?<=\* ).*/gm);
            const link = (contMatch as string[]).map((l) => parseLink(l));
            return link;
          };

          const t = (temp as string[]).map((element) => ({
            language: (element.match(getTitle) as string[])[0],
            projects: processLinks(element),
          }));

          return t as LangProps[];
        };

        setLoading(false);
        const langs = data.match(
          /(?:^|\n)## Projects by main language\s[^\n]*\n(.*?)(?=\n##?\s|$)/gs
        );
        const results = processHeader((langs as string[])[0]);
        setData(results);
        console.log(results);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <Head>
        <title>Open Source Israel</title>
        <meta name="description" content="Open Source Community Israel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
        <div className="langsList">
          {data.map((lang) => {
            return (
              <details key={lang.language} className="language">
                <summary><h1>{lang.language}</h1></summary>
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
              </details>
            );
          })}
        </div>
      </main>
    </>
  );
}
