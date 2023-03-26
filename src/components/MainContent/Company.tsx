import Image from "next/image";

export default function Project(props: {name: string, login: string, logo: string, setComp: (arg0: string) => unknown}) {
  const url = `https://www.github.com/${props.name}`;

  return (
    <div className="group flex flex-col gap-2">
        <Image
          onClick={()=>{props.setComp(props.login)}}
          draggable={false}
          className="rounded-xl aspect-square border border-myblue group-hover:scale-105 group-hover:shadow-3xl group-active:scale-95 transition"
          width={120}
          height={120}
          src={props.logo}
          alt={props.name}
        />
        <span className="flex flex-row text-center"><a href={url} target="_blank" className="break-normal w-full transition">{props.name}</a></span>
    </div>
  );
}
