export const sortButtonsTexts = {
  lastCommit: {
    title: "זמן גרסה אחרונה",
    buttons: [
      { text: "▲", action: "lastCommitReverse" },
      { text: "▼", action: "lastCommit" },
    ],
  },
  stars: {
    title: "כמות כוכבים",
    buttons: [
      { text: "▲", action: "starsReverse" },
      { text: "▼", action: "stars" },
    ],
  },
  issues: {
    title: "כמות Issues פתוחים",
    buttons: [
      { text: "▲", action: "issuesReverse" },
      { text: "▼", action: "issues" },
    ],
  },
  default: {
    title: "איפוס",
    buttons: [{ text: "איפוס", action: "default" }],
  },
} as const;
