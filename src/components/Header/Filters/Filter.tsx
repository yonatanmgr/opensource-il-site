import React from 'react';
import { sortButtonsTexts } from '../constants';
import { AllSortTypes, SortTypes } from '../types';
import { FilterButton } from './FilterButton';
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

  return (
    <div
      dir="rtl"
      className={`flex h-8 flex-row items-center justify-between gap-3 rounded-md border-none bg-mydarkblue px-4 font-['Rubik'] text-base text-white outline outline-1 outline-myblue transition hover:cursor-default hover:bg-buttonhover focus-visible:ring-2 ${
        isActive ? 'ring-2 ring-indigo-600' : 'outline outline-1'
      }`}
    >
      <span className="flex h-full flex-row items-center text-sm sm:text-base">
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
                  onSortChange(sortDir.action as SortTypes);
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
  );
}
