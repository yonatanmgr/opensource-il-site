import type { marked } from "marked";

interface MarkedEmojiOptions {
  emojis: Record<string, string>;
}

export function markedEmoji(options: MarkedEmojiOptions) {
  if (!options.emojis) {
    throw new Error("Must provide emojis to markedEmoji");
  }

  const start = (src: string) => {
    return src.indexOf(":");
  };

  const tokenizer = (src: string, tokens: marked.Token[]) => {
    const rule = /^:(.+?):/;
    const match = rule.exec(src);
    if (!match) return;
    const name = match[1];
    const emoji = options.emojis[name];
    if (!emoji) return;
    return {
      type: "emoji",
      raw: match[0],
      name,
      emoji,
    };
  };

  const renderer = (token: NonNullable<ReturnType<typeof tokenizer>>) => {
    return `<span class="emoji" data-name="${token.name}">${token.emoji}</span>`;
  };

  const extensions = [
    {
      name: "emoji",
      level: "inline",
      start,
      tokenizer,
      // This coercion is necessary because marked's type definitions are bad.
      renderer: renderer as (token: marked.Tokens.Generic) => string,
    },
  ];
  return {
    extensions,
  };
}
