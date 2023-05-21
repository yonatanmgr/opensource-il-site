'use client';
import Filters from '@/components/Header/Filters/Filters';
import SocialLinks from '@/components/Header/SocialLinks';
import { AllSortTypes } from '@/components/Header/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ReposList from '@/components/MainContent/ReposList/ReposList';
import PageContainer from '@/components/PageContainer';
import ReadmePanel from '@/components/ReadmePanel';
import useMarkdown from '@/hooks/useMarkdown';
import type { DataProps, RepoProps } from '@/types/index.type';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function ReposNavbar() {
  const router = useRouter();

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col-reverse flex-wrap items-center justify-between gap-3 lg:h-24 lg:flex-row"
    >
      <div className="flex select-none flex-row items-end text-right text-2xl font-extrabold min-[330px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        פרויקטי קוד פתוח ישראלים
      </div>

      <SocialLinks
        setView={(view) => {
          if (view === 'companies') router.push('/companies');
        }}
        view={'repos'}
      />
    </div>
  );
}

const DEFAULT_READ_ME_PLACEHOLDER = `<div dir="rtl" style="font-size: 18px; font-family: 'Rubik'">בחרו ב-Repository מהרשימה כדי לקרוא את קובץ ה-README שלו!</div>`;

const sortByLastCommit = (b: DataProps, a: DataProps) =>
  a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0;

export default function RepositoryPage() {
  const [isLoading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const [repositories, setRepositories] = useState<DataProps[]>([]);
  const [showData, setShowData] = useState<DataProps[]>([]);
  const [currentRepo, setCurrentRepo] = useState('');
  const { fetchMarkedDown, readMe, isReadmeLoading } = useMarkdown(
    DEFAULT_READ_ME_PLACEHOLDER
  );
  const [activeSortType, setSortFunction] = useState<
    AllSortTypes | undefined
  >();

  useEffect(() => {
    setLoading(true);
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRepos = async () => {
    const res = await fetch('/api/repositories');
    const data: any /*{ repository: RepoProps }[]*/ = await res.json();
    console.log('🚀 ~ file: page.tsx:93 ~ fetchRepos ~ data:', data);

    const organizedData = data.repositories
      .filter((proj: RepoProps) => proj !== null)
      .map((proj: { repository: RepoProps }) => {
        const repo = proj.repository;

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
          image: image,
          owner: nameWithOwner.split('/')[0],
          name: nameWithOwner.split('/')[1],
          description: description,
          lastCommit: lastCommit,
          stars: stargazerCount,
          issuesCount: issuesCount,
          languages: languages,
          totalSize: totalSize
        };
      });

    setRepositories(organizedData.sort(sortByLastCommit));
    setShowData(organizedData.sort(sortByLastCommit));
    setLoading(false);
  };

  const allLangs = useMemo(() => {
    return showData.reduce((allLangs: string[], repo: DataProps) => {
      if (repo.languages) {
        repo.languages.forEach((lang) => {
          if (!allLangs.includes(lang.name) && lang.name != 'Dockerfile')
            allLangs.push(lang.name);
        });
      }
      return allLangs.sort();
    }, []);
  }, [showData]);

  const onSetReadMe = async (readme: string) => {
    if (currentRepo !== readme) {
      const foundReadme = showData.find(
        (repo) => `https://www.github.com/${repo.owner}/${repo.name}` === readme
      );

      // nav to repo page
      setCurrentRepo(
        `https://www.github.com/${foundReadme?.owner}/${foundReadme?.name}`
      );

      if (foundReadme) {
        fetchMarkedDown(foundReadme);
      }
    }
  };

  const handleSortChange = (sortType: AllSortTypes) => {
    let sorted;
    switch (sortType) {
      case 'lastCommit':
        sorted = [...showData].sort((b: DataProps, a: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case 'lastCommitReverse':
        sorted = [...showData].sort((a: DataProps, b: DataProps) =>
          a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0
        );
        break;
      case 'stars':
        sorted = [...showData].sort(
          (b: DataProps, a: DataProps) => a.stars - b.stars
        );
        break;
      case 'starsReverse':
        sorted = [...showData].sort(
          (a: DataProps, b: DataProps) => a.stars - b.stars
        );
        break;
      case 'issues':
        sorted = [...showData].sort(
          (b: DataProps, a: DataProps) => a.issuesCount - b.issuesCount
        );
        break;
      case 'issuesReverse':
        sorted = [...showData].sort(
          (a: DataProps, b: DataProps) => a.issuesCount - b.issuesCount
        );
        break;
      case 'default':
        sorted = [...showData].sort(sortByLastCommit);
        break;
      default:
        sorted = [...showData];
        break;
    }
    setShowData(sorted);
    setSortFunction(sortType);
  };

  const dataForDisplay = useMemo(() => {
    return selectedLang === ''
      ? showData
      : showData.filter((repo: DataProps) =>
          repo.languages.find(
            (language: { name: string }) => language.name == selectedLang
          )
        );
  }, [showData, selectedLang]);

  if (!repositories && !isLoading) return <p>Error loading data</p>;

  return (
    <PageContainer>
      <LoadingSpinner show={isLoading} />
      <ReposNavbar />
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
        <ReposList setReadme={onSetReadMe} showData={dataForDisplay} />{' '}
        <ReadmePanel readmePreview={readMe} loading={isReadmeLoading} />
      </div>
    </PageContainer>
  );
}
