import baruque from "@/assets/covers/baruque.jpg";
import belEster from "@/assets/covers/bel-e-ester.jpg";
import eclesiastico from "@/assets/covers/eclesiastico.jpg";
import enoque from "@/assets/covers/enoque.jpg";
import esdras from "@/assets/covers/esdras.jpg";
import judite from "@/assets/covers/judite.jpg";
import oracaoSuzana from "@/assets/covers/oracao-e-suzana.jpg";
import paiNosso from "@/assets/covers/pai-nosso-original.jpg";
import sabedoriaSalomao from "@/assets/covers/sabedoria-de-salomao.jpg";

type CoverArt = {
  src: string;
  alt: string;
};

const BOOK_COVERS: Record<string, CoverArt> = {
  baruque: {
    src: baruque,
    alt: "Baruque escrevendo um pergaminho junto aos rios da Babilônia",
  },
  "bel-e-ester": {
    src: belEster,
    alt: "Ester no palácio persa sobre Daniel diante do ídolo de Bel e dos dragões",
  },
  eclesiastico: {
    src: eclesiastico,
    alt: "Sábio entre pergaminhos diante da árvore luminosa da sabedoria",
  },
  enoque: {
    src: enoque,
    alt: "Enoque sobre uma montanha contemplando os céus e os anjos Sentinelas",
  },
  esdras: {
    src: esdras,
    alt: "Esdras com o rolo da Lei diante da reconstrução de Jerusalém",
  },
  judite: {
    src: judite,
    alt: "Judite diante do acampamento assírio sob a lua, com Betúlia ao fundo",
  },
  "oracao-e-suzana": {
    src: oracaoSuzana,
    alt: "Tríptico com Manassés em oração, os três jovens na fornalha e Susana no jardim",
  },
  "pai-nosso-original": {
    src: paiNosso,
    alt: "Pergaminho aramaico iluminado sobre mãos abertas diante do cosmos",
  },
  "sabedoria-de-salomao": {
    src: sabedoriaSalomao,
    alt: "Salomão em contemplação diante da figura luminosa da Sabedoria",
  },
};

export function bookCoverFor(slug?: string): CoverArt | null {
  return slug ? (BOOK_COVERS[slug] ?? null) : null;
}