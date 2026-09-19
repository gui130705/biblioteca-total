export type ReaderIllustration = {
  src: string;
  alt: string;
  caption: string;
  chapterIndex: number;
  afterParagraph: number;
};

// O leitor atualmente não exibe ilustrações. Mantemos a API para evitar
// alterações desnecessárias na página do leitor e facilitar uma futura ativação.
export function readerIllustrationsFor(
  _slug?: string,
  _chapters = 0,
  _paragraphsByChapter: number[] = [],
): ReaderIllustration[] {
  return [];
}
