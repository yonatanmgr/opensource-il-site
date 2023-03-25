import { DataProps } from "@/pages";
import Project from "@/components/MainContent/ReposList/Project";

export default function ReposList(props: {
  showData: DataProps[];
  setReadme: any;
}) {
  return (
    <div
      dir="rtl"
      className="w-full flex h-auto flex-col overflow-y-auto overflow-x-hidden flex-no-wrap items-center gap-5 no-scrollbar"
    >
      {props.showData.map((proj) => {
        return (
          <Project setReadme={props.setReadme} repo={proj} key={proj.image} />
        );
      })}
    </div>
  );
}
