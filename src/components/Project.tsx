import Image from "next/image";

type ProjectProps = {
  setReadme: (name: string) => void;
  name: string;
  url: string;
  image: string;
  description: string;
};

export default function Project(props: ProjectProps) {
  return (
    <div className="projectBlock" onClick={() => props.setReadme(props.url)}>
      <div>
        <img
          title={props.description}
          width={320}
          height={160}
          className="projectPreview"
          src={props.image}
          alt={props.name}
        />
      </div>
      <a href={props.url} target="_blank" className="projectName">
        <span>{props.name}</span>
      </a>
    </div>
  );
}
