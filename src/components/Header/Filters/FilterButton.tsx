// import { sortButtonsTexts } from "../constants";
// import { SortTypes } from "../types";

interface FilterButtonProps {
  onClick: () => void;
  text: string;
  isActive: boolean;
}

export const FilterButton = ({
  onClick,
  text,
  isActive,
}: FilterButtonProps) => {
  return (
    <button
      className={` cursor-default focus-visible:ring-2 w-12 sm:w-8 h-full font-['Rubik'] px-1 border-x border-myblue hover:text-white/90 transition active:text-sm ${
        isActive ? "text-white" : "text-white/70"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
