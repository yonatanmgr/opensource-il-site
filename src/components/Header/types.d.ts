import { sortButtonsTexts } from "./constants";

export type SortTypes = keyof typeof sortButtonsTexts;
export type AllSortTypes = typeof sortButtonsTexts[keyof typeof sortButtonsTexts]["buttons"][number]["action"];
export interface TitleAndSocialLinkProps {
  setView: (view: Views) => void;
  view: string;
}
