import SocialLinks from './SocialLinks';
import { TitleAndSocialLinkProps } from './types';

export default function PageTitle({ setView, view }: TitleAndSocialLinkProps) {
  const currentView = {
    repos: <span>פרויקטי קוד פתוח ישראלים</span>,
    companies: <span>חברות ישראליות בקוד פתוח</span>
  }[view];
  return (
    <div
      dir="rtl"
      className="flex h-20 w-full flex-col-reverse flex-wrap items-center justify-between lg:flex-row"
    >
      <div
        dir="rtl"
        className="select-none text-right text-xl font-extrabold min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
      >
        {currentView}
      </div>
      <SocialLinks setView={setView} view={view} />
    </div>
  );
}
