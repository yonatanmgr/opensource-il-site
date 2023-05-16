import { CompanyProps } from '@/types/index.type';
import Image from 'next/image';

export default function Project(props: {
  name: string;
  login: string;
  avatar: string;
  setComp: (company: CompanyProps) => unknown;
}) {
  const url = `https://www.github.com/${props.login}`;

  return (
    <div className="group flex flex-col gap-2">
      <Image
        onClick={() => {
          props.setComp({
            name: props.name,
            login: props.login,
            avatar: props.avatar
          });
        }}
        draggable={false}
        className="aspect-square rounded-xl border border-myblue transition group-hover:scale-105 group-hover:shadow-3xl group-active:scale-95"
        width={120}
        height={120}
        src={props.avatar}
        alt={props.name}
      />
      <span dir="ltr" className="flex flex-row text-center">
        <a
          href={url}
          rel="noreferrer"
          target="_blank"
          className="w-full break-normal transition"
        >
          {props.name}
        </a>
      </span>
    </div>
  );
}
