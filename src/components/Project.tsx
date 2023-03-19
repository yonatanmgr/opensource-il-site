import Image from "next/image";

type ProjectProps = {
  name: string;
  url: string;
  image: string;
  description: string;
};

export default function Project(props: ProjectProps) {
  return (
    <div className="projectBlock">
      <a href={props.url} target="_blank">
        <img
          width={320}
          height={160}
          className="projectPreview"
          src={props.image}
          alt={props.name}
        />
      </a>
      <div className="projectName">
        <span>{props.name}</span>
      </div>
    </div>
  );
}
