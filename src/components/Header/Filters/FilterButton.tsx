interface FilterButtonProps {
  onClick: () => void;
  text: string;
  isActive: boolean;
}

export const FilterButton = ({
  onClick,
  text,
  isActive
}: FilterButtonProps) => {
  return (
    <button
      className={`h-full w-12 cursor-default border-x border-myblue px-1 font-['Rubik'] transition hover:text-white/90 focus-visible:ring-2 active:text-sm sm:w-8 ${
        isActive ? 'text-white' : 'text-white/70'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
