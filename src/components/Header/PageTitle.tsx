import SocialLinks from "./SocialLinks";

export default function PageTitle(props: {setView: (arg0: string) => unknown, view: string}) {
  return (
    <div
      dir="rtl"
      className="flex flex-col-reverse md:flex-row h-20 flex-wrap items-center justify-between w-full"
    >
      <div
        dir="rtl"
        className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-right select-none"
      >
        {{
          'repos': <span>פרויקטי קוד פתוח ישראלים</span>,
          'companies': <span>חברות ישראליות בקוד פתוח</span>,
        }[props.view]}
      </div>
      <SocialLinks setView={props.setView} />
    </div>
  );
}
