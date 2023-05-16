import { CompanyProps } from '@/types/index.type';
import Company from './Company';

export default function CompaniesList(props: {
  companies: CompanyProps[];
  setComp: (company: CompanyProps) => void;
}) {
  return (
    <div
      dir="rtl"
      className="no-scrollbar flex h-auto w-full flex-row flex-wrap items-center justify-around gap-6 overflow-y-auto"
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
