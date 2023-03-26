import { CompanyProps, DataProps } from "@/pages";
import Company from "./Company";

export default function CompaniesList(props: {
  companies: CompanyProps[];
  setComp: (arg0: string) => unknown
}) {
  return (
    <div
      dir="rtl"
      className="w-full flex h-auto flex-row justify-around overflow-y-auto flex-wrap items-center gap-6 no-scrollbar"
    >
      {props.companies.map((comp) => {
        return (
          <Company logo={comp.avatar} name={comp.name} login={comp.login} key={comp.login} setComp={props.setComp} />
        );
      })}
    </div>
  );
}
