import baruque from "@/assets/reader-illustrations/baruque.jpg";
import belEster from "@/assets/reader-illustrations/bel-e-ester.jpg";
import eclesiastico from "@/assets/reader-illustrations/eclesiastico.jpg";
import enoque from "@/assets/reader-illustrations/enoque.jpg";
import esdras from "@/assets/reader-illustrations/esdras.jpg";
import judite from "@/assets/reader-illustrations/judite.jpg";
import oracaoSuzana from "@/assets/reader-illustrations/oracao-e-suzana.jpg";
import paiNosso from "@/assets/reader-illustrations/pai-nosso-original.jpg";
import sabedoriaSalomao from "@/assets/reader-illustrations/sabedoria-de-salomao.jpg";

export type ReaderIllustration = {
  src: string;
  alt: string;
  caption: string;
  chapterIndex: number;
  afterParagraph: number;
};

const READER_ILLUSTRATIONS: Record<string, ReaderIllustration> = {
  baruque: {
    src: baruque,
    alt: "Exilados leem um pergaminho junto aos rios da Babilônia enquanto recordam Jerusalém",
    caption: "Às margens da Babilônia, a memória de Jerusalém transforma o exílio em oração.",
    chapterIndex: 0,
    afterParagraph: 10,
  },
  "bel-e-ester": {
    src: belEster,
    alt: "Daniel revela a passagem oculta do templo de Bel enquanto Ester se apresenta ao rei persa",
    caption: "Entre ídolos e palácios, a verdade se revela onde o poder julgava permanecer oculto.",
    chapterIndex: 0,
    afterParagraph: 10,
  },
  eclesiastico: {
    src: eclesiastico,
    alt: "Um sábio hebreu ensina seus discípulos entre pergaminhos e oliveiras",
    caption: "A sabedoria transmitida de geração em geração, como luz que amadurece o entendimento.",
    chapterIndex: 0,
    afterParagraph: 2,
  },
  enoque: {
    src: enoque,
    alt: "Enoque contempla os céus, os anjos e as rodas celestes a partir de uma montanha",
    caption: "Enoque contempla a ordem dos céus e os mistérios confiados aos antigos vigilantes.",
    chapterIndex: 0,
    afterParagraph: 1,
  },
  esdras: {
    src: esdras,
    alt: "Esdras proclama a Lei diante do povo durante a reconstrução de Jerusalém",
    caption: "A palavra reúne o povo enquanto as pedras de Jerusalém voltam a se erguer.",
    chapterIndex: 0,
    afterParagraph: 28,
  },
  judite: {
    src: judite,
    alt: "Judite e sua serva entram com coragem no acampamento assírio sob a lua",
    caption: "Judite atravessa a noite guiada pela coragem, com Betúlia ainda vigilante ao longe.",
    chapterIndex: 0,
    afterParagraph: 7,
  },
  "oracao-e-suzana": {
    src: oracaoSuzana,
    alt: "Tríptico sacro com Manassés em oração, os três jovens na fornalha e Susana no jardim",
    caption: "Da penitência ao livramento: três narrativas unidas pela oração e pela justiça divina.",
    chapterIndex: 0,
    afterParagraph: 7,
  },
  "pai-nosso-original": {
    src: paiNosso,
    alt: "Mestre e discípulos rezam juntos em uma colina diante do mar da Galileia ao amanhecer",
    caption: "Uma oração partilhada em comunidade, entre o silêncio da manhã e a vastidão do céu.",
    chapterIndex: 0,
    afterParagraph: 11,
  },
  "sabedoria-de-salomao": {
    src: sabedoriaSalomao,
    alt: "Salomão contempla a figura luminosa da Sabedoria entre estrelas, balança e oliveira",
    caption: "A Sabedoria, mais preciosa que o poder, ilumina o juízo e orienta o coração.",
    chapterIndex: 0,
    afterParagraph: 7,
  },
};

export function readerIllustrationFor(slug?: string): ReaderIllustration | null {
  return slug ? (READER_ILLUSTRATIONS[slug] ?? null) : null;
}