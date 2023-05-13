import { CompanyProps } from "@/types/index.types";
import Company from "./Company";

export default function CompaniesList(props: {
  companies: CompanyProps[];
  setComp: (company: CompanyProps) => void;
}) {
  return (
    <div
      dir="rtl"
      className="w-full flex h-auto flex-row justify-around overflow-y-auto flex-wrap items-center gap-6 no-scrollbar"
    >
      {props.companies.map((comp) => {
        return (
          <Company
            name={comp.name}
            login={comp.login}
            avatar={comp.avatar}
            key={comp.login}
            setComp={props.setComp}
          />
        );
      })}
    </div>
  );
}
