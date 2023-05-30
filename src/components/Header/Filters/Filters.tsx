import { useEffect, useState } from 'react';
import { sortButtonsTexts } from '../constants';
import { AllSortTypes, SortTypes } from '../types';
import { useWindowSize } from '@/hooks/useWindowSize';
import Filter from './Filter';

interface FiltersProps {
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
  selectedLang
}: FiltersProps) {
  const { isMediumUp } = useWindowSize();
  const [shouldShowFilters, setShouldShowFilters] = useState(true);

  // Hides filters on medium or smaller screens
  useEffect(() => {
    setShouldShowFilters(isMediumUp);
  }, [isMediumUp]);

  return (
    <div
      dir="rtl"
      className="min-h-8 mt-3 flex w-full flex-col flex-wrap gap-2.5 sm:mt-0 md:flex-row md:items-center"
    >
      <label className="flex h-8 flex-row items-center gap-2 opacity-70">
        <input
          type="checkbox"
          title="הצגת מסננים"
          id="filter"
          checked={shouldShowFilters}
          onChange={(e) => setShouldShowFilters(e.target.checked)}
        />
        {shouldShowFilters ? 'מיין לפי:' : 'הצג מסננים'}
      </label>
      {shouldShowFilters && (
        <>
          {Object.keys(sortButtonsTexts).map((sortType) => {
            if (sortType === 'default') return;
            return (
              <Filter
                key={sortType}
                sortType={sortType}
                activeSortType={activeSortType}
                onSortChange={handleSortChange}
                setShouldShowFilters={setShouldShowFilters}
              />
            );
          })}
          <select
            className="h-8 rounded-md border-none bg-mydarkblue px-4 font-['Rubik'] text-sm text-white outline outline-1 outline-myblue transition hover:bg-buttonhover focus-visible:ring-2 active:bg-buttonactive sm:text-base"
            name="languages"
            id="selectLang"
            title="סינון לפי שפה"
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.currentTarget.value);
              if (!isMediumUp) setShouldShowFilters(false);
            }}
          >
            <option value="">כל שפה</option>
            {langs.map((lang) => (
              <option key={lang} value={lang} dir="ltr">
                {lang}
              </option>
            ))}
          </select>
          <button
            className="flex h-8 flex-row items-center justify-between gap-3 rounded-md border-none bg-mydarkblue px-4 font-['Rubik'] text-sm text-white outline outline-1 outline-myblue transition hover:cursor-default hover:bg-buttonhover focus-visible:ring-2 sm:text-base"
            onClick={() => {
              handleSortChange('default');
              setSelectedLang('');
            }}
          >
            איפוס
          </button>
        </>
      )}
    </div>
  );
}
