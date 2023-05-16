import SocialLinks from './SocialLinks';
import { TitleAndSocialLinkProps } from './types';

export default function PageTitle({
  setView,
  view,
  companyName,
  onResetPage
}: TitleAndSocialLinkProps) {
  const currentView = {
    repos: (
      <span>
        {companyName ? (
          <>
            {companyName}
            <span className="font-light opacity-60"> / פרויקטים</span>
          </>
        ) : (
          'פרויקטי קוד פתוח ישראלים'
        )}
      </span>
    ),
    companies: <span>חברות ישראליות בקוד פתוח</span>
  }[view];
  return (
    <div
      dir="rtl"
      className="flex w-full flex-col-reverse flex-wrap items-center justify-between gap-3 lg:h-24 lg:flex-row"
    >
      <div
        dir="rtl"
        className={`flex flex-row ${
          companyName ? 'gap-4' : ''
        } select-none items-end text-right text-2xl font-extrabold min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
      >
        {companyName && view == 'repos' && (
          <button
            onClick={() => {
              onResetPage && onResetPage();
            }}
            className="flex cursor-default flex-row items-center rounded-xl border border-myblue bg-mydarkblue px-4 py-0.5 text-base transition hover:bg-buttonhover active:bg-buttonactive sm:text-lg md:text-xl lg:py-1 lg:text-2xl"
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
