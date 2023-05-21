'use client';
import Filters from '@/components/Header/Filters/Filters';
import SocialLinks from '@/components/Header/SocialLinks';
import type { AllSortTypes } from '@/components/Header/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ReposList from '@/components/MainContent/ReposList/ReposList';
import PageContainer from '@/components/PageContainer';
import ReadmePanel from '@/components/ReadmePanel';
import useMarkdown from '@/hooks/useMarkdown';
import type { DataProps, Organization, RepoProps } from '@/types/index.type';
import {
  parseLastParamFromUrl,
  parseSearchParams
} from '@/utils/extractParamFromUrl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT_READ_ME_PLACEHOLDER = `<div dir="rtl" style="font-size: 18px; font-family: 'Rubik'">בחרו ב-Repository מהרשימה כדי לקרוא את קובץ ה-README שלו!</div>`;

function CompanyNavbar({ companyName }: { companyName: string | undefined }) {
  const router = useRouter();

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col-reverse flex-wrap items-center justify-between gap-3 lg:h-24 lg:flex-row"
    >
      <div className="flex select-none flex-row items-end text-right text-2xl font-extrabold min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        <button
          onClick={() => {
            router.back();
          }}
          className="flex cursor-default flex-row items-center rounded-xl border border-myblue bg-mydarkblue px-4 py-0.5 text-base transition hover:bg-buttonhover active:bg-buttonactive sm:text-lg md:text-xl lg:py-1 lg:text-2xl"
        >
          &lt;
        </button>
        &nbsp;
        {companyName}&nbsp;
        <span className="font-light opacity-60"> / פרויקטים</span>
      </div>

      <SocialLinks
        setView={(view) => {
          if (view === 'repos') router.push('/');
        }}
        view={'companies'}
      />
    </div>
  );
}

const sortByLastCommit = (b: DataProps, a: DataProps) =>
  a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0;

function CompanyRepositories() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setLoading] = useState(false);
  const [companyRepos, setCompaniesRepos] = useState<DataProps[]>([]);
  const [showData, setShowData] = useState<DataProps[]>([]);
  const [company, setCompany] = useState<Organization>();
  const [currentDisplayedRepo, setCurrentRepo] = useState('');
  const [activeSortType, setSortFunction] = useState<
    AllSortTypes | undefined
  >();
  const [selectedLang, setSelectedLang] = useState('');
  const { fetchMarkedDown, readMe, isReadmeLoading } = useMarkdown(
    DEFAULT_READ_ME_PLACEHOLDER
  );
  const [companyName, setCompanyName] = useState<string | undefined>('');

  const onSetReadMe = async (readme: string) => {
    if (currentDisplayedRepo !== readme) {
      const foundReadme = companyRepos.find(
        (repo) => `https://www.github.com/${repo.owner}/${repo.name}` === readme
      );

      // for if check above to prevent refetch of active readme
      setCurrentRepo(
        `https://www.github.com/${foundReadme?.owner}/${foundReadme?.name}`
      );

      if (foundReadme) {
        fetchMarkedDown(foundReadme);
      }
    }
  };

  const fetchCompanyRepos = async (company: string) => {
    setLoading(true);
    const res = await fetch('/api/company/' + company);
    const data: { company: { organization: Organization } } = await res.json();
    setCompany(data.company.organization);

    setCompaniesRepos(
      (data.company.organization.repositories.nodes as RepoProps[])
        .map((repo) => {
          const nameWithOwner = repo.nameWithOwner;
          const image = repo.openGraphImageUrl;
          const description = repo.description ?? '';
          const lastCommit = repo.defaultBranchRef
            ? repo.defaultBranchRef.target.committedDate
            : '1970-01-01T00:00:00Z';
          const stargazerCount = repo.stargazerCount;
          const issuesCount = repo.openIssues.totalCount;
          const languages = repo.languages.edges.map((lang) => ({
            name: lang.node.name,
            size: lang.size
          }));
          const totalSize = repo.languages.totalSize;

          return {
            id: crypto.randomUUID(),
            image,
            owner: nameWithOwner.split('/')[0],
            name: nameWithOwner.split('/')[1],
            description,
            lastCommit,
            stars: stargazerCount,
            issuesCount,
            languages,
            totalSize
          };
        })
        .filter((repo: DataProps) => repo.name != '.github')
        .sort(sortByLastCommit)
    );
    setLoading(false);
  };

  const handleSortChange = (sortType: AllSortTypes) => {
    let sorted;
    switch (sortType) {
      case 'lastCommit':
        sorted = [...companyRepos].sort((b: DataProps, a: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case 'lastCommitReverse':
        sorted = [...companyRepos].sort((a: DataProps, b: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case 'stars':
        sorted = [...companyRepos].sort(
          (b: DataProps, a: DataProps) => a.stars - b.stars
        );
        break;
      case 'starsReverse':
        sorted = [...companyRepos].sort(
          (a: DataProps, b: DataProps) => a.stars - b.stars
        );
        break;
      case 'issues':
        sorted = [...companyRepos].sort(
          (b: DataProps, a: DataProps) => a.issuesCount - b.issuesCount
        );
        break;
      case 'issuesReverse':
        sorted = [...companyRepos].sort(
          (a: DataProps, b: DataProps) => a.issuesCount - b.issuesCount
        );
        break;
      case 'default':
        sorted = [...companyRepos].sort(sortByLastCommit);
        break;
      default:
        sorted = [...companyRepos];
        break;
    }
    setShowData(sorted);
    setSortFunction(sortType);
  };

  const allLangs = useMemo(() => {
    return companyRepos.reduce((allLangs: string[], repo: DataProps) => {
      if (repo.languages) {
        repo.languages.forEach((lang) => {
          if (!allLangs.includes(lang.name) && lang.name != 'Dockerfile')
            allLangs.push(lang.name);
        });
      }
      return allLangs.sort();
    }, []);
  }, [companyRepos]);

  useEffect(() => {
    setShowData(companyRepos.sort(sortByLastCommit));
  }, [company, companyRepos]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: page.tsx:11 ~ useEffect ~   {pathname ,searchParams}:',
      { pathname, searchParams: searchParams.toString() }
    );

    const companyLogin = parseLastParamFromUrl(pathname);
    if (companyLogin) setCompanyName(companyLogin);

    // const searchParamObj = parseSearchParams(searchParams.toString());
    if (companyLogin) fetchCompanyRepos(companyLogin);

    // if (pathname && pathname.split('/')) fetchCompanyRepos(pathname);
    // You can now use the current URL
  }, [pathname, searchParams]);

  const dataForDisplay = useMemo(() => {
    return selectedLang === ''
      ? showData
      : showData.filter((repo: DataProps) =>
          repo.languages.find(
            (language: { name: string }) => language.name == selectedLang
          )
        );
  }, [showData, selectedLang]);

  return (
    <PageContainer>
      <LoadingSpinner show={isLoading} />
      <CompanyNavbar companyName={companyName} />
      <Filters
        activeSortType={activeSortType}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        handleSortChange={handleSortChange}
        langs={allLangs}
      />
      <div
        dir="rtl"
        className="flex h-screen w-full flex-row justify-between gap-2.5 overflow-y-auto"
      >
        <ReposList setReadme={onSetReadMe} showData={dataForDisplay} />
        <ReadmePanel readmePreview={readMe} loading={isReadmeLoading} />
      </div>
    </PageContainer>
  );
}

export default CompanyRepositories;
