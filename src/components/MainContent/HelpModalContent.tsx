import React from 'react';
import ReposIcon from '../Icons/ReposIcon';
import OrgIcon from '../Icons/OrgIcon';
import { Views } from '@/types/index.type';

type Props = {
  handleModalClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  setView: React.Dispatch<React.SetStateAction<Views>>;
  view: string;
};

function HelpModalContent({ handleModalClick, setView, view }: Props) {
  return (
    <div
      dir="rtl"
      className="flex h-auto flex-col gap-4 text-lg"
      onClick={(e) => handleModalClick(e)}
    >
      <p>ברוכים הבאים!</p>
      <p>
        באתר זה תוכלו למצוא פרויקטי קוד פתוח ישראליים וחברות ישראליות המתחזקות
        ספריות קוד פתוח, לקרוא על הפרויקטים ולמצוא את הפרויקט הבא (ואולי גם
        הראשון 😉) אליו תוכלו לתרום.
      </p>
      <p>
        במסך המאגרים (<ReposIcon setView={setView} view={view} />
        ), לחיצה על &quot;הצג מסננים&quot;, תפתח בפניכם מספר אפשרויות סינון
        שיעזרו לכם למצוא את הפרויקט האידיאלי עבורכם: <b>זמן גרסה אחרון</b>,{' '}
        <b>כמות כוכבים</b> ו-
        <b>כמות Issues פתוחים</b>. בנוסף, תוכלו לסנן את כל הפרויקטים המוצגים לפי
        שפת התכנות שלהם וכך לדייק את חיפושיכם לפרויקטים המתאימים לכם ביותר.
      </p>
      <p>
        בלחיצה על כפתור החברות ( <OrgIcon setView={setView} view={view} /> ),
        יוצגו בפניכם עשרות חברות ישראליות המתחזקות ספריות קוד פתוח. בעוד שלחיצה
        על שם החברה יוביל לדף הבית שלה ב-GitHub, לחיצה על סמליל החברה יפתח
        בפניכם את כל מאגרי הקוד הפתוח הציבוריים שלה, אליהם תוכלו להצטרף.
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
        ! מוזמנים להצטרף לפיתוח, להוסיף תכולות ולסייע בתיקון תקלות - וכך לעזור
        לבנות בית לקוד הפתוח בישראל.
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
  );
}

export default HelpModalContent;
