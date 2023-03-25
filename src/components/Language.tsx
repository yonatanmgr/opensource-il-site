import { langsColors } from "./langColors";

export default function LangPill(props: { name: string, size: number }) {
  return (
    <div className={`text-${setContrast(langsColors[props.name])} bg-[${langsColors[props.name]}] p-0.5 pr-2 pl-2 text-xs rounded`}>
      {props.name} <span className="langPercent">({props.size}%)</span>
    </div>
  );
}

const setContrast = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) return (parseInt(result[1], 16) * 299 + parseInt(result[2], 16) * 587 + parseInt(result[3], 16) * 114) / 1000 > 125 ? 'black' : 'white'
}
