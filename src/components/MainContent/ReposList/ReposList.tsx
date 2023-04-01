import Project from "@/components/MainContent/ReposList/Project";
import { DataProps } from "@/types/index.types";

export default function ReposList(props: {
  showData: DataProps[];
  setReadme: (readme: string) => void;
}) {
  return (
    <div
      dir='rtl'
      className='w-full flex h-auto flex-col overflow-y-auto overflow-x-hidden flex-no-wrap items-center gap-5 no-scrollbar'
    >
      {props.showData.map((proj, idx) => {
        return (
          <Project setReadme={props.setReadme} repo={proj} key={idx} />
        );
      })}
    </div>
  );
}
