import { useState } from "react";
import { sortButtonsTexts } from "../constants";
import { FilterButton } from "./FilterButton";
import { SortTypes } from "../types";
import { useWindowSize } from "@/hooks/useWindowSize";

interface Props {
  handleSortChange: (sortType: SortTypes) => void;
  setSelectedLang: (lang: string) => void;
  langs: string[];
  activeSortType: SortTypes | undefined;
  selectedLang: string;
}

export default function Filters({
  langs,
  setSelectedLang,
  handleSortChange,
  activeSortType,
  selectedLang,
}: Props) {
  const [shouldShowFilters, setShouldShowFilters] = useState(false);
  const { isMediumUp } = useWindowSize();

  return (
    <div
      dir='rtl'
      className='min-h-8 mt-3 sm:mt-0 gap-2.5 flex flex-wrap flex-col md:flex-row w-full md:items-center'
    >
      <label className='opacity-70 h-8 flex flex-row items-center gap-2 hover:cursor-pointer'>
        <input
          type='checkbox'
          title='הצגת מסננים'
          id='filter'
          checked={shouldShowFilters}
          onChange={(e) => setShouldShowFilters(e.target.checked)}
        />
        {shouldShowFilters ? "מיין לפי:" : "הצג מסננים"}
      </label>
      {shouldShowFilters && (
        <>
          {Object.keys(sortButtonsTexts).map((sortType) => (
            <FilterButton
              isActive={activeSortType === sortType}
              key={sortType}
              text={sortButtonsTexts[sortType as SortTypes]}
              onClick={() => {
                handleSortChange(sortType as SortTypes);
                if (!isMediumUp) {
                  setShouldShowFilters(false);
                }
              }}
            />
          ))}
          <select
            className="h-8 text-sm font-['Rubik'] hover:cursor-pointer focus-visible:ring-2 rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"
            name='languages'
            id='selectLang'
            title='סינון לפי שפה'
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.currentTarget.value);
              if (!isMediumUp) {
                setShouldShowFilters(false);
              }
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
