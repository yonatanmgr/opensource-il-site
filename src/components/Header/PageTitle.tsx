import { Views } from "@/types/index.types";
import SocialLinks from "./SocialLinks";
import { TitleAndSocialLinkProps } from "./types";


export default function PageTitle({ setView, view }: TitleAndSocialLinkProps) {
  const currentView = {
    repos: <span>פרויקטי קוד פתוח ישראלים</span>,
    companies: <span>חברות ישראליות בקוד פתוח</span>,
  }[view];
  return (
    <div
      dir='rtl'
      className='flex flex-col-reverse gap-3 lg:flex-row lg:h-24 flex-wrap items-center justify-between w-full'
    >
      <div
        dir='rtl'
        className='text-xl min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-right select-none'
      >
        {currentView}
      </div>
      <SocialLinks setView={setView} view={view} />
    </div>
  );
}
