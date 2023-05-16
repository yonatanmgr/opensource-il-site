'use client';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import ReadmePreview from '@/components/MainContent/ReadmePreview';
import ReposList from '@/components/MainContent/ReposList/ReposList';
import PageTitle from '@/components/Header/PageTitle';
import Filters from '@/components/Header/Filters/Filters';
import CompaniesList from '@/components/MainContent/CompaniesList';
import { AllSortTypes } from '@/components/Header/types';
import { CompanyProps, DataProps, RepoProps, Views } from '@/types/index.type';
import Modal from '@/components/HelpModal';
import OrgIcon from '@/components/Icons/OrgIcon';
import ReposIcon from '@/components/Icons/ReposIcon';
import axios from 'axios';
import useMarkdown from '@/hooks/useMarkdown';
//
const BASE_URL = `/api/`;
const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
  // const token = LocalStorageService.get(TOKEN_LS_KEY);
  // if (token) {
  //   config.headers = config.headers || {};
  //   (config.headers as any)['Authorization'] = `Bearer ${token}`;
  // }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('🚀 ~ file: HttpService.ts:39 ~ error:', error);
    // if (error.response.status === 401) {
    //   // dispatch the logout action
    //   store.dispatch(logoutAction())
    //   LocalStorageService.delete(TOKEN_LS_KEY)
    //   LocalStorageService.delete(ROLE_LS_KEY)
    //   LocalStorageService.delete(USERNAME_LS_KEY)
    // }
    return Promise.reject(error);
  }
);

const DEFAULT_READ_ME_PLACEHOLDER = `<div dir="rtl" style="font-size: 18px; font-family: 'Rubik'">בחרו ב-Repository מהרשימה כדי לקרוא את קובץ ה-README שלו!</div>`;
const COMPANIES_READ_ME_PLACEHOLDER = `<div dir="rtl" style="font-size: 18px; font-family: 'Rubik'"><p>בחרו בחברה מהרשימה כדי להיכנס לרשימת ה-Repositories שלה,</p><p>או לחצו על שם החברה כדי לראות את עמוד ה-GitHub שלה!</p></div>`;

export default function Home() {
  const [view, setView] = useState<Views>('repos');
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [currentCompanyName, setCurrentCompanyName] = useState<string>();
  const [data, setData] = useState<DataProps[]>([]);
  const [showData, setShowData] = useState<DataProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isReadmeLoading, setIsReadmeLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const [readmePreview, setReadmePreview] = useState('');
  const [currentRepo, setCurrentRepo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeSortType, setSortFunction] = useState<
    AllSortTypes | undefined
  >();

  const { parseMarkdown } = useMarkdown();

  const sortByLastCommit = (b: DataProps, a: DataProps) =>
    a.lastCommit < b.lastCommit ? -1 : a.lastCommit > b.lastCommit ? 1 : 0;

  const defaultSort = sortByLastCommit;

  useEffect(() => {
    setLoading(true);
    fetchRepos();
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    view === 'companies'
      ? setReadmePreview(COMPANIES_READ_ME_PLACEHOLDER)
      : setReadmePreview(DEFAULT_READ_ME_PLACEHOLDER);
  }, [view]);

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

    setData(organizedData.sort(defaultSort));
    setShowData(organizedData.sort(defaultSort));
    setLoading(false);
    setReadmePreview(DEFAULT_READ_ME_PLACEHOLDER);
  };

  const fetchCompanyRepos = async (company: string) => {
    setLoading(true);
    // const res = await fetch(
    //   `https://os-il-api.vercel.app/api/company/${company}`
    // );
    // const data = await res.json();

    const res = await fetch('/api/company/' + company);
    const data = await res.json();
    console.log('🚀 ~ file: page.tsx:159 ~ fetchCompanyRepos ~ data:', {
      company,
      data
    });
    setShowData(
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
        })
        .filter((repo: DataProps) => repo.name != '.github')
        .sort(defaultSort)
    );
    setView('repos');
    setLoading(false);
  };

  const onSetReadMe = async (readme: string) => {
    if (currentRepo !== readme) {
      setIsReadmeLoading(true);
      const foundReadme = showData.find(
        (repo) => `https://www.github.com/${repo.owner}/${repo.name}` === readme
      );

      setCurrentRepo(
        `https://www.github.com/${foundReadme?.owner}/${foundReadme?.name}`
      );

      if (foundReadme) {
        let res = await fetch(
          `https://api.github.com/repos/${foundReadme.owner}/${foundReadme.name}/readme`
        );
        let data = await res.json();
        res = await fetch(data.download_url);
        data = await res.text();
        const text = data.replace(`<nobr>`, '');
        const html = parseMarkdown(text);
        setReadmePreview(html);
        setIsReadmeLoading(false);
      }
    }
  };

  const onSelectCompany = (company: CompanyProps) => {
    fetchCompanyRepos(company.login);
    setCurrentCompanyName(company.name);
    setSelectedLang('');
  };

  const resetPage = () => {
    setLoading(true);
    setCurrentCompanyName(undefined);
    fetchRepos();
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
        sorted = [...showData].sort(defaultSort);
        break;
      default:
        sorted = [...showData];
        break;
    }
    setShowData(sorted);
    setSortFunction(sortType);
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

  const dataForDisplay = useMemo(() => {
    return selectedLang === ''
      ? showData
      : showData.filter((repo: DataProps) =>
          repo.languages.find((language) => language.name == selectedLang)
        );
  }, [showData, selectedLang]);

  if (!data && !isLoading) return <p>Error loading data</p>;

  const currentView = {
    repos: <ReposList setReadme={onSetReadMe} showData={dataForDisplay} />,
    companies: <CompaniesList companies={companies} setComp={onSelectCompany} />
  }[view];

  const loadingSpinner = (
    <div className="absolute h-screen w-screen bg-black/50">
      <div className="center fixed left-[49%] top-[45%] h-10 w-10 animate-spin rounded-full border-8 border-mydarkblue border-t-myblue bg-transparent"></div>
    </div>
  );

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <>
      <div onClick={() => setShowModal(false)}>
        <Modal show={showModal} setShow={setShowModal}>
          <div
            dir="rtl"
            className="flex h-auto flex-col gap-4 text-lg"
            onClick={(e) => handleModalClick(e)}
          >
            <p>ברוכים הבאים!</p>
            <p>
              באתר זה תוכלו למצוא פרויקטי קוד פתוח ישראליים וחברות ישראליות
              המתחזקות ספריות קוד פתוח, לקרוא על הפרויקטים ולמצוא את הפרויקט הבא
              (ואולי גם הראשון 😉) אליו תוכלו לתרום.
            </p>
            <p>
              במסך המאגרים (<ReposIcon setView={setView} view={view} />
              ), לחיצה על &quot;הצג מסננים&quot;, תפתח בפניכם מספר אפשרויות
              סינון שיעזרו לכם למצוא את הפרויקט האידיאלי עבורכם:{' '}
              <b>זמן גרסה אחרון</b>, <b>כמות כוכבים</b> ו-
              <b>כמות Issues פתוחים</b>. בנוסף, תוכלו לסנן את כל הפרויקטים
              המוצגים לפי שפת התכנות שלהם וכך לדייק את חיפושיכם לפרויקטים
              המתאימים לכם ביותר.
            </p>
            <p>
              בלחיצה על כפתור החברות ( <OrgIcon setView={setView} view={view} />{' '}
              ), יוצגו בפניכם עשרות חברות ישראליות המתחזקות ספריות קוד פתוח.
              בעוד שלחיצה על שם החברה יוביל לדף הבית שלה ב-GitHub, לחיצה על
              סמליל החברה יפתח בפניכם את כל מאגרי הקוד הפתוח הציבוריים שלה,
              אליהם תוכלו להצטרף.
            </p>
            <p>
              לחיצה על הקישור ל-GitHub בחלקו העליון של הדף, תוביל אתכם למאגר{' '}
              <a
                href="https://github.com/lirantal/awesome-opensource-israel"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-400 decoration-dotted transition hover:underline"
              >
                awesome-opensource-israel
              </a>
              , ממנו נמשכים המאגרים והארגונים המוצגים באתר זה.
            </p>
            <p>
              פרויקט נוסף אליו תוכלו לתרום קוד הוא{' '}
              <a
                href="https://github.com/yonatanmgr/opensource-il-site"
                rel="noreferrer"
                target="_blank"
                className="font-medium text-blue-400 decoration-dotted transition hover:underline"
              >
                אתר זה ממש
              </a>
              ! מוזמנים להצטרף לפיתוח, להוסיף תכולות ולסייע בתיקון תקלות - וכך
              לעזור לבנות בית לקוד הפתוח בישראל.
            </p>
            <p className="text-center text-sm opacity-50">
              נוצר ע&quot;י יונתן מגר, 2023. ממשיך להתקיים{' '}
              <a
                href="https://github.com/yonatanmgr/opensource-il-site/graphs/contributors"
                rel="noreferrer"
                target="_blank"
                className="font-medium text-blue-400 decoration-dotted transition hover:underline"
              >
                בזכותכם
              </a>
              .
            </p>
          </div>
        </Modal>
      </div>
      <Head>
        <title>קוד פתוח ישראלי</title>
        <meta name="description" content="Open Source Community Israel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && loadingSpinner}
      <main className="flex max-h-screen min-h-screen flex-col items-center justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0 md:p-16 md:pb-0">
        <div className="flex w-full flex-col gap-2.5">
          <PageTitle
            view={view}
            setView={(view) => {
              setView(view);
            }}
            companyName={currentCompanyName}
            onResetPage={resetPage}
          />
          {view === 'repos' && (
            <Filters
              activeSortType={activeSortType}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
              handleSortChange={handleSortChange}
              langs={allLangs}
            />
          )}
        </div>
        <div
          dir="rtl"
          className="flex h-screen w-full flex-row justify-between gap-2.5 overflow-y-auto"
        >
          {currentView}
          <ReadmePreview
            readmePreview={readmePreview}
            loading={isReadmeLoading}
          />
        </div>
        <div
          className="fixed bottom-6 left-5 flex h-14 w-14 cursor-help select-none flex-row items-center justify-center rounded-full border border-myblue bg-mydarkblue text-3xl shadow-4xl transition hover:bg-buttonhover active:bg-buttonactive sm:bottom-10 sm:left-9"
          onClick={() => setShowModal(true)}
        >
          ?
        </div>
      </main>
    </>
  );
}
