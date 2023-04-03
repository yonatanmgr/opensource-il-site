import React from "react";
import { sortButtonsTexts } from "../constants";
import { AllSortTypes, SortTypes } from "../types";
import { FilterButton } from "./FilterButton";
import { useWindowSize } from "@/hooks/useWindowSize";

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
  setShouldShowFilters,
}: FilterProps) {
  const { isMediumUp } = useWindowSize();

  return (
    <div
      dir="rtl"
      className="flex justify-between flex-row items-center gap-3 h-8 text-base hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-md px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover  text-white"
    >
      <span className="flex flex-row items-center h-full text-sm sm:text-base">
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
