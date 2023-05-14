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
        {companyName ? <>{companyName}<span className="font-light opacity-60"> / פרויקטים</span></> : "פרויקטי קוד פתוח ישראלים"}
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
          companyName ? "gap-4" : ""
        } items-end text-2xl min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-right select-none`}
      >
        {companyName && view == "repos" && (
          <button
            onClick={() => {
              onResetPage && onResetPage();
            }}
            className="lg:text-2xl md:text-xl sm:text-lg text-base flex flex-row items-center py-0.5 lg:py-1 border transition hover:bg-buttonhover active:bg-buttonactive border-myblue px-4 rounded-xl bg-mydarkblue cursor-default"
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
