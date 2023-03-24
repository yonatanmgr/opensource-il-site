import { langsColors } from "./langColors";

export default function LangPill(props: { name: string, size: number }) {
  return (
    <div className="langPill" style={
        { 
            backgroundColor: langsColors[props.name],
            color: setContrast(langsColors[props.name]),
            padding: "2px",
            paddingRight: "8px",
            paddingLeft: "8px",
            fontSize: "smaller",
            borderRadius: "5px"
         }
        }>
      {props.name} <span className="langPercent">({props.size}%)</span>
    </div>
  );
}

const setContrast = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
        return (parseInt(result[1], 16) * 299 + parseInt(result[2], 16) * 587 + parseInt(result[3], 16) * 114) / 1000 > 125 ? 'black' : 'white'
    }
    
}
