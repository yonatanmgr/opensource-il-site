import { useState } from "react";
import { sortButtonsTexts } from "../constants";
import { FilterButton } from "./FilterButton";
import { AllSortTypes, SortTypes } from "../types";
import { useWindowSize } from "@/hooks/useWindowSize";

interface Props {
  handleSortChange: (sortType: SortTypes) => void;
  setSelectedLang: (lang: string) => void;
  langs: string[];
  activeSortType: AllSortTypes | undefined;
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
      dir="rtl"
      className="min-h-8 mt-3 sm:mt-0 gap-2.5 flex flex-wrap flex-col md:flex-row w-full md:items-center"
    >
      <label className="opacity-70 h-8 flex flex-row items-center gap-2">
        <input
          type="checkbox"
          title="הצגת מסננים"
          id="filter"
          checked={shouldShowFilters}
          onChange={(e) => setShouldShowFilters(e.target.checked)}
        />
        {shouldShowFilters ? "מיין לפי:" : "הצג מסננים"}
      </label>
      {shouldShowFilters && (
        <>
          {Object.keys(sortButtonsTexts).map((sortType) => (
            <div
              dir="rtl"
              key={sortType}
              className="flex justify-between flex-row items-center gap-3 h-8 text-base hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-md px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover  text-white"
            >
              <span className="h-full sm:text-base text-sm flex flex-row items-center">
                {sortButtonsTexts[sortType as SortTypes].title}
              </span>
              <div className="h-full">
                {sortButtonsTexts[sortType as SortTypes].buttons.map(
                  (sortDir: { action: string; text: string }) => {
                    return (
                      <FilterButton
                        isActive={activeSortType === sortDir.action}
                        key={sortDir.action}
                        text={sortDir.text}
                        onClick={() => {
                          handleSortChange(sortDir.action as SortTypes);
                          if (!isMediumUp) {
                            setShouldShowFilters(false);
                          }
                        }}
                      />
                    );
                  }
                )}
              </div>
            </div>
          ))}
          <select
            className="h-8 font-['Rubik'] sm:text-base text-sm focus-visible:ring-2 rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"            name="languages"
            id="selectLang"
            title="סינון לפי שפה"
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.currentTarget.value);
              if (!isMediumUp) {
                setShouldShowFilters(false);
              }
            }}
          >
            <option value="">כל שפה</option>
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
