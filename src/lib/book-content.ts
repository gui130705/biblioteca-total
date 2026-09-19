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

function normalizeReaderText(text: string) {
  return text
    .normalize("NFC")
    .replace(/\u00a0/g, " ")
    .replace(/\\s+/g, " ")
    .replace(/\\s+([,.;:!?])/g, "$1")
    .replace(/([,.;:!?])(?=[A-Za-zÀ-ÿ])/g, "$1 ")
    .replace(/\\s+-\\s+/g, " — ")
    .replace(/1º ENOQUE,?\\s*\\d+(?:,\\s*\\d+)*/gi, "")
    .replace(/\\bdisse-lhe(s)?\\b/gi, "disse-lhe$1")
    .replace(/\\btornou-se\\b/gi, "tornou-se")
    .replace(/\\btornouse\\b/gi, "tornou-se")
    .replace(/\\blançao\\b/gi, "lança-o")
    .replace(/\\btem-se\\b/gi, "têm-se")
    .replace(/\\btem se\\b/gi, "têm-se")
    .replace(/\\s{2,}/g, " ")
    .trim();
}

function normalizeBookContent(content: BookContent): BookContent {
  return {
    ...content,
    chapters: content.chapters.map((chapter) => ({
      ...chapter,
      title: normalizeReaderText(chapter.title),
      paragraphs: chapter.paragraphs
        .map(normalizeReaderText)
        .filter(Boolean),
    })),
  };
}

export async function loadBookContent(slug: string): Promise<BookContent | null> {
  const loader = modules[`../content/books/${slug}.json`];
  if (!loader) return null;
  const mod = (await loader()) as { default: BookContent };
  return normalizeBookContent(mod.default);
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
