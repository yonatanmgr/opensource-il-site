import Image from 'next/image';

export default function Project(props: {
  name: string;
  login: string;
  logo: string;
  setComp: (arg0: string[]) => unknown;
}) {
  const url = `https://www.github.com/${props.login}`;

  return (
    <div className="group flex flex-col gap-2">
      <Image
        onClick={() => {
          props.setComp([props.login, props.name]);
        }}
        draggable={false}
        className="aspect-square rounded-xl border border-myblue transition group-hover:scale-105 group-hover:shadow-3xl group-active:scale-95"
        width={120}
        height={120}
        src={props.logo}
        alt={props.name}
      />
      <span dir="ltr" className="flex flex-row text-center">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="w-full break-normal transition"
        >
          {props.name}
        </a>
      </span>
    </div>
  );
}
