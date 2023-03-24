import moment from "moment";
import "moment/locale/he";
import LangPill from "./Language";

type ProjectProps = {
  setReadme: (name: string) => void;
  name: string;
  owner: string;
  url: string;
  image: string;
  description: string;
  lastCommit: string;
  stars: number;
  issuesCount: number;
  languages: { name: string; size: number }[];
};

const starSvg = (
  <svg
    aria-hidden="true"
    height="15"
    viewBox="0 0 16 16"
    version="1.1"
    width="15"
    fill="white"
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

export default function Project(props: ProjectProps) {
  return (
    <div className="projectBlock" onClick={() => props.setReadme(props.url)}>
      <a href={props.url} target="_blank">
        <img
          title={props.description}
          width={320}
          height={160}
          className="projectPreview"
          src={props.image}
          alt={props.name}
        />
      </a>
      <div className="projectValues">
        <div className="projectNameWithOwner">
          <span className="projectOwner">{props.owner}/</span>
          <span className="projectName">{props.name}</span>
        </div>

        <div className="projectStats">
          <span className="starsCount">
            {nFormatter(props.stars)}
            {starSvg}
          </span>{" "}
          |
          <span className="issueCount">
            {props.issuesCount}{" "}
            {props.issuesCount == 1 ? "Open Issue" : "Open Issues"}
          </span>{" "}
          |
          <span className="lastCommit">
            גרסה אחרונה:{" "}
            {moment(props.lastCommit)
              .locale("he")
              .calendar()
              .replace("האחרון ", "")}
          </span>
        </div>
        <div className="langsList">
          {props.languages ? props.languages
            .filter((lang) => lang.name != "Dockerfile")
            .map((lang) => (
              <LangPill name={lang.name} key={lang.size}></LangPill>
            )): <></>}
        </div>
      </div>
    </div>
  );
}
