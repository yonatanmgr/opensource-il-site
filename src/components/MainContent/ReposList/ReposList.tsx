import Project from '@/components/MainContent/ReposList/Project';
import { DataProps } from '@/types/index.type';

export default function ReposList(props: {
  showData: DataProps[];
  setReadme: (readme: string) => void;
}) {
  return (
    <div
      dir="rtl"
      className="flex-no-wrap no-scrollbar flex h-auto w-full flex-col items-center gap-5 overflow-y-auto overflow-x-hidden"
    >
      {props.showData.map((project) => {
        return (
          <Project
            setReadme={props.setReadme}
            repo={project}
            key={project.id}
          />
        );
      })}
    </div>
  );
}
