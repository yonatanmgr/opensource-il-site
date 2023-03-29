import { useState } from "react";
import { sortButtonsTexts } from "../constants";
import { FilterButton } from "./FilterButton";
import { SortTypes } from "../types";

interface Props {
  handleSortChange: (sortType: SortTypes) => void;
  setSelectedLang: (lang: string) => void;
  langs: string[];
  activeSortType: SortTypes | undefined;
}

export default function Filters({
  langs,
  setSelectedLang,
  handleSortChange,
  activeSortType,
}: Props) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div
      dir='rtl'
      className='min-h-8 mt-3 sm:mt-0 gap-2.5 flex flex-wrap flex-col md:flex-row w-full md:items-center'
    >
      <span className='opacity-70 h-8 flex flex-row items-center gap-2'>
        <input
          type='checkbox'
          title='הצגת מסננים'
          id='filter'
          onChange={(e) => setShowFilters(e.target.checked)}
        />
        {showFilters ? "מיין לפי:" : "הצג מסננים"}
      </span>
      {showFilters && (
        <>
          {Object.keys(sortButtonsTexts).map((sortType) => (
            <FilterButton
              isActive={activeSortType === sortType}
              key={sortType}
              text={sortButtonsTexts[sortType as SortTypes]}
              onClick={() => handleSortChange(sortType as SortTypes)}
            />
          ))}
          <select
            className="h-8 text-sm font-['Rubik'] focus-visible:ring-2 rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"
            name='languages'
            id='selectLang'
            title='סינון לפי שפה'
            onChange={(e) => {
              setSelectedLang(e.currentTarget.value);
            }}
          >
            <option value=''>כל שפה</option>
            {langs.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
