import { sortButtonsTexts } from "./constants";

export type SortTypes = keyof typeof sortButtonsTexts;

export interface TitleAndSocialLinkProps {
  setView: (view: Views) => void;
  view: string;
}
