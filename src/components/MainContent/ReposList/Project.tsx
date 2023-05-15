import moment from "moment";
import "moment/locale/he";
import LangPill from "./Language";
import Image from "next/image";
import TimeIcon from "@/components/Icons/TimeIcon";
import IssueIcon from "@/components/Icons/IssueIcon";
import { DataProps } from "@/types/index.types";

type ProjectProps = {
  setReadme: (name: string) => void;
  repo: DataProps;
};

const starSvg = (
  <svg
    aria-hidden="true"
    height="15"
    viewBox="0 0 16 16"
    version="1.1"
    width="15"
    fill="currentColor"
  >
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
  </svg>
);

function nFormatter(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}

export default function Project({ repo, setReadme }: ProjectProps) {
  const url = `https://www.github.com/${repo.owner}/${repo.name}`;

  return (
    <div
      className="group flex w-[calc(100%-10px)] cursor-pointer select-none flex-col rounded-xl border border-myblue bg-mydarkblue transition ease-linear hover:shadow-3xl active:scale-95 sm:flex-row"
      onClick={() => setReadme(url)}
    >
      <a href={url} draggable="false" target="_blank" title={repo.description}>
        <Image
          className="aspect-[2/1] rounded-tl-xl rounded-tr-xl max-sm:w-full sm:h-full sm:rounded-br-xl sm:rounded-tl-none"
          width={320}
          height={160}
          src={repo.image}
          alt={repo.name}
        />
      </a>
      <div className="mr-2 flex h-full w-full flex-col items-start justify-start gap-2 p-2">
        <div className="text-xl">
          <span className="font-light opacity-70">{repo.owner}/</span>
          <span className="font-bold">{repo.name}</span>
        </div>

        <div className="flex flex-row flex-wrap items-center gap-2 font-light opacity-80">
          <span dir="ltr" className="flex flex-row items-center gap-1">
            {nFormatter(repo.stars)}
            <span className="transition group-hover:text-amber-300">
              {starSvg}
            </span>
          </span>{" "}
          ·
          <span dir="ltr" className="flex flex-row items-center gap-1">
            {repo.issuesCount} <IssueIcon />
            <span className="hidden sm:contents">
              {repo.issuesCount == 1 ? "Open Issue" : "Open Issues"}
            </span>
          </span>{" "}
          ·
          <span className={`flex flex-row items-center gap-1`}>
            <TimeIcon />
            {moment(repo.lastCommit)
              .locale("he")
              .calendar()
              .replace("האחרון ", "")}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          {repo.languages ? (
            repo.languages
              .filter((lang) => lang.name != "Dockerfile")
              .map((lang) => (
                <LangPill
                  name={lang.name}
                  size={Math.round((lang.size / repo.totalSize) * 1000) / 10}
                  key={repo.stars + lang.size}
                ></LangPill>
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
