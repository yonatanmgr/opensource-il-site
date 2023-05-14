import React, { useState } from "react";
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

  const isActive = sortButtonsTexts[sortType as SortTypes].buttons?.some(
    (tp: any) => tp.action === activeSortType
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div
      dir="rtl"
      className={`flex justify-between flex-row items-center select-none h-8 text-base hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-md px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white ${
        isActive ? "ring-2 ring-mylightblue gap-3" : "outline outline-1"
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
      <span className="flex flex-row items-center h-full text-sm sm:text-base">
        {sortButtonsTexts[sortType as SortTypes].title}
      </span>
      <div className="h-full">
        {isActive && <i className={`arrow ${activeIndex ? `down` : `up`}`} />}
      </div>
    </div>
  );
}
