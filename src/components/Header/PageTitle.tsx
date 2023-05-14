import SocialLinks from "./SocialLinks";
import { TitleAndSocialLinkProps } from "./types";

export default function PageTitle({
  setView,
  view,
  companyName,
  onResetPage,
}: TitleAndSocialLinkProps) {
  const currentView = {
    repos: (
      <span>
        {companyName ? `${companyName} - פרויקטים` : "פרויקטי קוד פתוח ישראלים"}
      </span>
    ),
    companies: <span>חברות ישראליות בקוד פתוח</span>,
  }[view];
  return (
    <div
      dir="rtl"
      className="flex flex-col-reverse gap-3 lg:flex-row lg:h-24 flex-wrap items-center justify-between w-full"
    >
      <div
        dir="rtl"
        className={`flex flex-row ${
          companyName ? "gap-3" : ""
        } items-end text-2xl min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-right select-none`}
      >
        {companyName && (
          <button
            onClick={() => {
              onResetPage && onResetPage();
            }}
            className="lg:text-3xl border border-myblue px-4 rounded-xl bg-mydarkblue"
          >
            &lt;
          </button>
        )}
        {currentView}
      </div>
      <SocialLinks setView={setView} view={view} />
    </div>
  );
}
