import React, { useState } from 'react';
import { sortButtonsTexts } from '../constants';
import { AllSortTypes, SortTypes } from '../types';
import { useWindowSize } from '@/hooks/useWindowSize';

interface FilterProps {
  sortType: string;
  activeSortType: AllSortTypes | undefined;
  onSortChange: (sortType: SortTypes) => void;
  setShouldShowFilters: (arg0: boolean) => unknown;
}

export default function Filter({
  sortType,
  activeSortType,
  onSortChange,
  setShouldShowFilters
}: FilterProps) {
  const { isMediumUp } = useWindowSize();

  const isActive = sortButtonsTexts[sortType as SortTypes].buttons?.some(
    (tp: any) => tp.action === activeSortType
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div
      dir="rtl"
      className={`flex h-8 select-none flex-row items-center justify-between rounded-md border-none bg-mydarkblue px-4 font-['Rubik'] text-base text-white outline outline-1 outline-myblue transition hover:cursor-default hover:bg-buttonhover focus-visible:ring-2 active:bg-buttonactive ${
        isActive ? 'gap-3 ring-2 ring-mylightblue' : 'outline outline-1'
      }`}
      onClick={() => {
        setActiveIndex(() => (activeIndex === 1 ? 0 : 1));
        onSortChange(
          sortButtonsTexts[sortType as SortTypes].buttons[activeIndex]
            .action as SortTypes
        );
        if (!isMediumUp) {
          setShouldShowFilters(false);
        }
      }}
    >
      <span className="flex h-full flex-row items-center text-sm sm:text-base">
        {sortButtonsTexts[sortType as SortTypes].title}
      </span>
      <div className="h-full">
        {isActive && <i className={`arrow ${activeIndex ? `down` : `up`}`} />}
      </div>
    </div>
  );
}
