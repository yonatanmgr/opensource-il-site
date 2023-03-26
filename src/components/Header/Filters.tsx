import { useState } from "react";

export default function Filters(props: {
  setSortFunction: (arg0: string) => unknown;
  setSelectedLang: (arg0: string) => unknown;
  langs: string[];
}) {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div
      dir="rtl"
      className="min-h-8 mt-3 sm:mt-0 gap-2.5 flex flex-wrap flex-row w-full items-center"
    >
      <span className="opacity-70 h-8 flex flex-row items-center gap-2">
        <input
          type="checkbox"
          title="הצגת מסננים"
          id="filter"
          onChange={(e) => setShowFilters(e.target.checked)}
        />
        {showFilters ? "מיין לפי (קליק ימני - סדר הפוך):" : "הצג מסננים"}
      </span>
      {showFilters ? (
        <>
          <button
            className="h-8 text-sm hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"
            onClick={(e) => {
              e.currentTarget.innerHTML = "זמן גרסה אחרונה (מהחדש לישן)";
              props.setSortFunction("lastCommit");
            }}
            onContextMenu={(e) => {
              e.currentTarget.innerHTML = "זמן גרסה אחרונה (מהישן לחדש)";
              e.preventDefault();
              props.setSortFunction("lastCommitReverse");
            }}
          >
            זמן גרסה אחרונה
          </button>
          <button
            className="h-8 text-sm hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"
            onClick={(e) => {
              e.currentTarget.innerHTML = "כמות כוכבים";
              props.setSortFunction("stars");
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.currentTarget.innerHTML = "כמות כוכבים (סדר עולה)";
              props.setSortFunction("starsReverse");
            }}
          >
            כמות כוכבים
          </button>
          <button
            className="h-8 text-sm hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"
            onClick={(e) => {
              e.currentTarget.innerHTML = "כמות Issues פתוחים";
              props.setSortFunction("issues");
            }}
            onContextMenu={(e) => {
              e.currentTarget.innerHTML = "כמות Issues פתוחים (סדר עולה)";
              e.preventDefault();
              props.setSortFunction("issuesReverse");
            }}
          >
            כמות Issues פתוחים
          </button>
          <select
            className="h-8 text-sm font-['Rubik'] focus-visible:ring-2 rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"
            name="languages"
            id="selectLang"
            title="סינון לפי שפה"
            onChange={(e) => {
              props.setSelectedLang(e.currentTarget.value);
            }}
          >
            <option value="">כל שפה</option>
            {props.langs.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
