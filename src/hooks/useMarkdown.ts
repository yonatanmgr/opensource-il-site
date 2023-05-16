import { marked } from 'marked';
import { markedEmoji } from '../parser-plugins/markedEmoji';
import { nameToEmoji } from 'gemoji';

marked.use(
  {
    // This silences warnings about deprecated options, which are enabled by default for some reason, taken from:
    // https://github.com/markedjs/marked/issues/2793#issuecomment-1532386286
    mangle: false,
    headerIds: false
  },
  // This is a custom plugin that adds support for emojis, taken from the source code of the marked-emoji package: https://www.npmjs.com/package/marked-emoji
  // and modified to our needs.
  markedEmoji({
    emojis: nameToEmoji
  })
);

export default function useMarkdown() {
  const parseMarkdown = (markdown: string) => {
    return marked.parse(markdown);
  };

  return {
    parseMarkdown
  };
}
import { marked } from "marked";
import { markedEmoji } from "../parser-plugins/markedEmoji";
import { nameToEmoji } from "gemoji";

marked.use(
  {
    // This silences warnings about deprecated options, which are enabled by default for some reason, taken from:
    // https://github.com/markedjs/marked/issues/2793#issuecomment-1532386286
    mangle: false,
    headerIds: false,
  },
  // This is a custom plugin that adds support for emojis, taken from the source code of the marked-emoji package: https://www.npmjs.com/package/marked-emoji
  // and modified to our needs.
  markedEmoji({
    emojis: nameToEmoji,
  })
);

export default function useMarkdown() {
  const parseMarkdown = (markdown: string) => {
    return marked.parse(markdown);
  };

  return {
    parseMarkdown,
  };
}
