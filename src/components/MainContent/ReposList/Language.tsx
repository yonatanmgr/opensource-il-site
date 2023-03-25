import { langsColors } from "./langColors";

export default function LangPill(props: { name: string; size: number }) {
  return (
    <div
      style={{
        backgroundColor: langsColors[props.name],
        color: setContrast(langsColors[props.name]),
      }}
      className={`p-0.5 px-2 text-[14px] rounded`}
    >
      {props.name} <span className="group-hover:text-[14px] opacity-70 text-[0px] duration-200">({props.size}%)</span>
    </div>
  );
}

const setContrast = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result)
    return (parseInt(result[1], 16) * 299 + parseInt(result[2], 16) * 587 + parseInt(result[3], 16) * 114) / 1000 > 125
    ? "black" : "white";
};
