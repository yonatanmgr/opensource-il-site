import Project from "@/components/MainContent/ReposList/Project";
import { DataProps } from "@/types/index.types";

export default function ReposList(props: {
  showData: DataProps[];
  setReadme: (readme: string) => void;
}) {
  return (
    <div
      dir="rtl"
      className="flex flex-col flex-no-wrap items-center w-full h-auto gap-5 overflow-x-hidden overflow-y-auto no-scrollbar"
    >
      {props.showData.map((project) => {
        return (
          <Project setReadme={props.setReadme} repo={project} key={project.id} />
        );
      })}
    </div>
  );
}
