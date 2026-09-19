import baruque from "@/assets/reader-illustrations/baruque.jpg";
import baruqueLuto from "@/assets/reader-illustrations/baruque-siao-em-luto.jpg";
import baruqueJerusalem from "@/assets/reader-illustrations/baruque-retorno-jerusalem.jpg";
import belEster from "@/assets/reader-illustrations/bel-e-ester.jpg";
import belEsterDragoes from "@/assets/reader-illustrations/bel-e-ester-dragoes.jpg";
import belEsterDecreto from "@/assets/reader-illustrations/bel-e-ester-contra-decreto.jpg";
import eclesiastico from "@/assets/reader-illustrations/eclesiastico.jpg";
import eclesiasticoSilencio from "@/assets/reader-illustrations/eclesiastico-silencio.jpg";
import eclesiasticoSabia from "@/assets/reader-illustrations/eclesiastico-escuta-sabia.jpg";
import enoque from "@/assets/reader-illustrations/enoque.jpg";
import enoqueCeus from "@/assets/reader-illustrations/enoque-sete-ceus.jpg";
import enoqueNoe from "@/assets/reader-illustrations/enoque-noe-diluvio.jpg";
import esdras from "@/assets/reader-illustrations/esdras.jpg";
import esdrasJovens from "@/assets/reader-illustrations/esdras-tres-jovens.jpg";
import esdrasCaravana from "@/assets/reader-illustrations/esdras-caravana-sacerdotes.jpg";
import judite from "@/assets/reader-illustrations/judite.jpg";
import juditeGuardas from "@/assets/reader-illustrations/judite-guardas-assirios.jpg";
import juditeClamor from "@/assets/reader-illustrations/judite-clamor-israel.jpg";
import oracaoSuzana from "@/assets/reader-illustrations/oracao-e-suzana.jpg";
import oracaoJardim from "@/assets/reader-illustrations/oracao-susana-jardim.jpg";
import oracaoFornalha from "@/assets/reader-illustrations/oracao-fornalha-orvalho.jpg";
import paiNosso from "@/assets/reader-illustrations/pai-nosso-original.jpg";
import paiNossoCosmos from "@/assets/reader-illustrations/pai-nosso-cosmos.jpg";
import paiNossoDespertar from "@/assets/reader-illustrations/pai-nosso-despertar.jpg";
import sabedoria from "@/assets/reader-illustrations/sabedoria-de-salomao.jpg";

export type ReaderIllustration = {
  src: string;
  alt: string;
  caption: string;
  chapterIndex: number;
  afterParagraph: number;
};

type Artwork = Omit<ReaderIllustration, "chapterIndex" | "afterParagraph">;

const ART = {
  baruque: [
    { src: baruque, alt: "Baruque em oração diante da cidade antiga", caption: "Baruque — oração e memória diante de Jerusalém." },
    { src: baruqueLuto, alt: "Baruque em lamento junto às ruínas de Jerusalém", caption: "Baruque — lamento e esperança entre as ruínas." },
    { src: baruqueJerusalem, alt: "Retorno a Jerusalém em paisagem antiga", caption: "Baruque — retorno e restauração de Jerusalém." },
  ],
  bel: [
    { src: belEster, alt: "Bel e Ester em cenário bíblico antigo", caption: "Bel e Ester — coragem diante do poder." },
    { src: belEsterDragoes, alt: "Cena de Bel e Ester com os dragões do relato", caption: "Bel e Ester — a cena dos dragões." },
    { src: belEsterDecreto, alt: "Bel e Ester diante de um decreto real", caption: "Bel e Ester — resistência ao decreto." },
  ],
  eclesiastico: [
    { src: eclesiastico, alt: "Ancião e escriba em estudo de sabedoria", caption: "Eclesiástico — o ensino da sabedoria." },
    { src: eclesiasticoSilencio, alt: "Ancião em contemplação silenciosa", caption: "Eclesiástico — silêncio e contemplação." },
    { src: eclesiasticoSabia, alt: "Discípulo ouvindo um sábio em manuscrito antigo", caption: "Eclesiástico — escutar a voz do sábio." },
  ],
  enoque: [
    { src: enoque, alt: "Enoque contemplando uma visão celestial", caption: "Enoque — visão e contemplação celestial." },
    { src: enoqueCeus, alt: "Representação dos sete céus em arte sacra antiga", caption: "Enoque — os sete céus da visão." },
    { src: enoqueNoe, alt: "Noé e a visão do dilúvio em arte bíblica antiga", caption: "Enoque — Noé e a visão do dilúvio." },
  ],
  esdras: [
    { src: esdras, alt: "Esdras com manuscritos em cenário antigo", caption: "Esdras — o escriba diante dos manuscritos." },
    { src: esdrasJovens, alt: "Três jovens em narrativa bíblica antiga", caption: "Esdras — os três jovens e a prova da fé." },
    { src: esdrasCaravana, alt: "Caravana de sacerdotes em viagem", caption: "Esdras — a caravana dos sacerdotes." },
  ],
  judite: [
    { src: judite, alt: "Judite em cenário de guerra do antigo Oriente", caption: "Judite — coragem diante do cerco." },
    { src: juditeGuardas, alt: "Guardas assírios em acampamento antigo", caption: "Judite — o acampamento dos assírios." },
    { src: juditeClamor, alt: "Povo de Israel reunido em oração", caption: "Judite — clamor de Israel." },
  ],
  suzana: [
    { src: oracaoSuzana, alt: "Suzana em jardim representado como manuscrito antigo", caption: "Suzana — a cena do jardim." },
    { src: oracaoJardim, alt: "Suzana em oração no jardim", caption: "Suzana — oração e testemunho." },
    { src: oracaoFornalha, alt: "Oração diante da fornalha em arte sacra", caption: "Oração — fé diante da provação." },
  ],
  pai: [
    { src: paiNosso, alt: "Representação antiga do Pai Nosso", caption: "Pai Nosso — a oração em tradição antiga." },
    { src: paiNossoDespertar, alt: "Figura em despertar espiritual em arte sacra", caption: "Pai Nosso — despertar espiritual." },
    { src: paiNossoCosmos, alt: "Céu e cosmos em composição de manuscrito antigo", caption: "Pai Nosso — oração e cosmos." },
  ],
  sabedoria: [
    { src: sabedoria, alt: "Rei e escribas em cena de sabedoria antiga", caption: "Sabedoria de Salomão — o ensino do sábio." },
  ],
} satisfies Record<string, Artwork[]>;

const FALLBACK: Artwork[] = [...ART.enoque, ...ART.esdras, ...ART.judite, ...ART.baruque, ...ART.sabedoria];

function familyForSlug(slug: string): Artwork[] {
  const s = slug.toLowerCase();
  if (s.includes("baruque") || s.includes("baruc")) return ART.baruque;
  if (s.includes("bel") || s.includes("ester")) return ART.bel;
  if (s.includes("eclesiast") || s.includes("sirac")) return ART.eclesiastico;
  if (s.includes("enoque") || s.includes("enoch")) return ART.enoque;
  if (s.includes("esdras") || s.includes("ezra")) return ART.esdras;
  if (s.includes("judite") || s.includes("judith")) return ART.judite;
  if (s.includes("suzana") || s.includes("susana") || s.includes("oracao")) return ART.suzana;
  if (s.includes("pai-nosso") || s.includes("pai_nosso") || s.includes("aramaico")) return ART.pai;
  if (s.includes("sabedoria") || s.includes("salomao") || s.includes("salomão")) return ART.sabedoria;
  return FALLBACK;
}

function positionsForChapter(paragraphCount: number): number[] {
  if (paragraphCount <= 0) return [];
  if (paragraphCount <= 6) return [Math.max(0, paragraphCount - 1)];
  if (paragraphCount <= 14) return [Math.max(1, Math.floor(paragraphCount * 0.55))];
  if (paragraphCount <= 26) return [Math.max(1, Math.floor(paragraphCount * 0.3)), Math.max(1, Math.floor(paragraphCount * 0.72))];
  return [Math.max(1, Math.floor(paragraphCount * 0.2)), Math.max(1, Math.floor(paragraphCount * 0.48)), Math.max(1, Math.floor(paragraphCount * 0.76))];
}

export function readerIllustrationsFor(slug = "", chapters = 0, paragraphsByChapter: number[] = []): ReaderIllustration[] {
  const family = familyForSlug(slug);
  const result: ReaderIllustration[] = [];
  for (let chapterIndex = 0; chapterIndex < chapters; chapterIndex += 1) {
    const paragraphCount = paragraphsByChapter[chapterIndex] ?? 0;
    positionsForChapter(paragraphCount).forEach((afterParagraph, positionIndex) => {
      const art = family[(chapterIndex * 2 + positionIndex) % family.length];
      if (!art) return;
      result.push({ ...art, chapterIndex, afterParagraph });
    });
  }
  return result;
}
