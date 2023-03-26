import { sortButtonsTexts } from "../constants";
import { SortTypes } from "../types";

interface FilterButtonProps {
  onClick: () => void;
  text: typeof sortButtonsTexts[SortTypes];
  isActive: boolean;
}

export const FilterButton = ({
  onClick,
  text,
  isActive,
}: FilterButtonProps) => {
  return (
    <button
      className={`h-8 text-sm hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-xl px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover  text-white ${
        //can add class to give indication for active sort
        isActive ? "" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
