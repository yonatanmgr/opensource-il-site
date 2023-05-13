import { CompanyProps } from '@/types/index.type';
import Company from './Company';

export default function CompaniesList(props: {
  companies: CompanyProps[];
  setComp: (arg0: string[]) => unknown;
}) {
  return (
    <div
      dir="rtl"
      className="no-scrollbar flex h-auto w-full flex-row flex-wrap items-center justify-around gap-6 overflow-y-auto"
    >
      {props.companies.map((comp) => {
        return (
          <Company
            logo={comp.avatar}
            name={comp.name}
            login={comp.login}
            key={comp.login}
            setComp={props.setComp}
          />
        );
      })}
    </div>
  );
}
