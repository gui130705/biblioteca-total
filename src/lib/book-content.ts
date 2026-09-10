import { useQuery } from "@tanstack/react-query";

export type BookChapter = {
  title: string;
  words: number;
  paragraphs: string[];
};

export type BookContent = {
  slug: string;
  words: number;
  chapters: BookChapter[];
};

const modules = import.meta.glob("../content/books/*.json");

export function hasContent(slug: string) {
  return `../content/books/${slug}.json` in modules;
}

export const WORDS_PER_MINUTE = 190;

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export async function loadBookContent(slug: string): Promise<BookContent | null> {
  const loader = modules[`../content/books/${slug}.json`];
  if (!loader) return null;
  const mod = (await loader()) as { default: BookContent };
  return mod.default;
}

export function useBookContent(slug: string) {
  return useQuery({
    queryKey: ["book-content", slug],
    queryFn: () => loadBookContent(slug),
    staleTime: Infinity,
  });
}

/** Percentual global de leitura considerando o tamanho de cada capítulo. */
export function computePercent(
  content: BookContent,
  chapterIndex: number,
  scrollRatio: number,
) {
  const total = content.words || 1;
  let before = 0;
  for (let i = 0; i < chapterIndex && i < content.chapters.length; i += 1) {
    before += content.chapters[i]!.words;
  }
  const current = content.chapters[chapterIndex]?.words ?? 0;
  const raw = ((before + current * Math.min(Math.max(scrollRatio, 0), 1)) / total) * 100;
  return Math.min(100, Math.max(0, Math.round(raw)));
}
