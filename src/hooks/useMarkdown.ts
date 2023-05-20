import { useState } from 'react';
import { marked } from 'marked';
import { markedEmoji } from '../parser-plugins/markedEmoji';
import { nameToEmoji } from 'gemoji';
import { DataProps } from '@/types/index.type';

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

export default function useMarkdown(readme?: string) {
  const [readMe, setReadme] = useState(readme || '');
  const [isReadmeLoading, setIsReadmeLoading] = useState(false);

  const parseMarkdown = (markdown: string) => {
    return marked.parse(markdown);
  };

  const fetchMarkedDown = async (repo: DataProps) => {
    const readmeUrl = `https://api.github.com/repos/${repo.owner}/${repo.name}/readme`;
    try {
      setIsReadmeLoading(true);
      let res = await fetch(readmeUrl);
      let data = await res.json();
      if (data?.message === 'Not Found') {
        throw new Error('data fetch for repo failed');
      }
      res = await fetch(data.download_url);
      data = await res.text();
      const text = data.replace(`<nobr>`, '');
      const html = parseMarkdown(text);
      setReadme(html);
    } catch (error) {
      console.error(
        '🚀 ~ file: useMarkdown.ts:35 ~ fetchMarkedDown ~ error:',
        error
      );
      setReadme(/*html*/ `
      <div dir="ltr" style="font-size: 18px; font-family: 'Rubik'">
        Readme fetching failed for - <br/> ${readmeUrl}
      </div>`);
    } finally {
      setIsReadmeLoading(false);
    }
  };
  return {
    parseMarkdown,
    fetchMarkedDown,
    isReadmeLoading,
    readMe
  };
}
