'use client';
import SocialLinks from '@/components/Header/SocialLinks';
import LoadingSpinner from '@/components/LoadingSpinner';
import CompaniesList from '@/components/MainContent/CompaniesList';
import ReadmePanel from '@/components/ReadmePanel';
import PageContainer from '@/components/PageContainer';
import { useRouter } from 'next/navigation';
import { CompanyProps } from '@/types/index.type';
import { useEffect, useState } from 'react';

function CompanyNavbar() {
  const router = useRouter();

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col-reverse flex-wrap items-center justify-between gap-3 lg:h-24 lg:flex-row"
    >
      <div className="flex select-none flex-row items-end text-right text-2xl font-extrabold min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        חברות ישראליות בקוד פתוח
      </div>

      <SocialLinks
        setView={(view) => {
          if (view === 'repos') router.push('/repositories');
        }}
        view={'companies'}
      />
    </div>
  );
}

const COMPANIES_READ_ME_PLACEHOLDER = `<div dir="rtl" style="font-size: 18px; font-family: 'Rubik'"><p>בחרו בחברה מהרשימה כדי להיכנס לרשימת ה-Repositories שלה,</p><p>או לחצו על שם החברה כדי לראות את עמוד ה-GitHub שלה!</p></div>`;

export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCompanies();
  }, []);
  useEffect(() => {
    setLoading(companies.length ? false : true);
  }, [companies]);

  const fetchCompanies = async () => {
    const res = await fetch('/api/company');
    const data = await res.json();

    setCompanies(
      data.companies
        .filter(
          (company: { organization: { [key: string]: string } }) =>
            company.organization?.name?.length &&
            company.organization?.avatarUrl?.length
        )
        .map(
          ({ organization }: { organization: { [key: string]: string } }) => {
            return {
              name: organization.name,
              login: organization.login,
              avatar: organization.avatarUrl
            };
          }
        )
    );
  };

  const onSelectCompany = (company: CompanyProps): void => {
    console.log('🚀 ~ file: page.tsx:38 ~ onSelectCompany ~ company:', company);
    // redirect to company page
    router.push(
      `/companies/${company.login}?name=${company.name}&avatarUrl=${company.avatar}`
    );
  };
  return (
    <PageContainer>
      <LoadingSpinner show={isLoading} />
      <CompanyNavbar />
      <div
        dir="rtl"
        className="flex h-screen w-full flex-row justify-between gap-2.5 overflow-y-auto"
      >
        <CompaniesList companies={companies} setComp={onSelectCompany} />
        <ReadmePanel
          readmePreview={COMPANIES_READ_ME_PLACEHOLDER}
          loading={isLoading}
        />
      </div>
    </PageContainer>
  );
}
