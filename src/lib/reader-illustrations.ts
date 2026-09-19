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

const pd = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${file}`;

const ART = {
  baruque: [
    { src: baruque, alt: "Baruque em oração diante da cidade antiga", caption: "Baruque — oração e memória diante de Jerusalém." },
    { src: baruqueLuto, alt: "Baruque em lamento junto às ruínas de Jerusalém", caption: "Baruque — lamento e esperança entre as ruínas." },
    { src: baruqueJerusalem, alt: "Retorno a Jerusalém em paisagem antiga", caption: "Baruque — retorno e restauração de Jerusalém." },
    { src: pd("Baruch-ben-Neriah.jpg"), alt: "Baruque ben Nerias representado em gravura antiga", caption: "Baruque ben Nerias — escriba e companheiro de Jeremias." },
    { src: pd("125.Baruch.jpg"), alt: "Baruque em uma gravura histórica", caption: "Baruque — figura de um antigo compêndio histórico." },
    { src: pd("Baruch_dayan_emes.png"), alt: "Ornamento de manuscrito judaico antigo", caption: "Manuscrito antigo — ornamentação e tradição escrita." },
  ],
  bel: [
    { src: belEster, alt: "Bel e Ester em cenário bíblico antigo", caption: "Bel e Ester — coragem diante do poder." },
    { src: belEsterDragoes, alt: "Cena de Bel e Ester com os dragões do relato", caption: "Bel e Ester — a cena dos dragões." },
    { src: belEsterDecreto, alt: "Bel e Ester diante de um decreto real", caption: "Bel e Ester — resistência ao decreto." },
    { src: pd("Queen_Esther_Approaching_the_Palace_of_Ahasuerus_(IA_mma_queen_esther_approaching_the_palace_of_ahasuerus_336489).jpg"), alt: "Ester aproximando-se do palácio de Assuero", caption: "Ester — aproximação do palácio de Assuero em arte histórica." },
    { src: pd("Esther_scroll_(Hebrew_MS_37).png"), alt: "Rolo ilustrado de Ester do século XVIII", caption: "Ester — rolo ilustrado de tradição judaica." },
    { src: pd("North_French_Hebrew_Miscellany_260b.l_Esther_before_Ahasuerus.jpg"), alt: "Ester diante de Assuero em manuscrito medieval", caption: "Ester — diante de Assuero em manuscrito medieval." },
  ],
  eclesiastico: [
    { src: eclesiastico, alt: "Ancião e escriba em estudo de sabedoria", caption: "Eclesiástico — o ensino da sabedoria." },
    { src: eclesiasticoSilencio, alt: "Ancião em contemplação silenciosa", caption: "Eclesiástico — silêncio e contemplação." },
    { src: eclesiasticoSabia, alt: "Discípulo ouvindo um sábio em manuscrito antigo", caption: "Eclesiástico — escutar a voz do sábio." },
    { src: pd("Cpg18_Blatt_329r_-_Susanna_wird_zur_Hinrichtung_geführt.jpg"), alt: "Página de manuscrito medieval com narrativa bíblica", caption: "Manuscrito medieval — narrativa e tradição sapiencial." },
    { src: pd("Illuminated_Manuscript,_Bible_(part),_God_appears_to_Moses_and_a_group_of_Israelites,_Walters_Manuscript_W.805,_fol._78v.jpg"), alt: "Manuscrito bíblico iluminado com figuras antigas", caption: "Manuscrito iluminado — tradição bíblica e escrita sacra." },
    { src: pd("Decorated_Text_Page_with_half_figure_of_Eusebius_-_Google_Art_Project.jpg"), alt: "Página decorada de manuscrito com figura de escriba", caption: "Página iluminada — escriba e tradição do texto antigo." },
  ],
  enoque: [
    { src: enoque, alt: "Enoque contemplando uma visão celestial", caption: "Enoque — visão e contemplação celestial." },
    { src: enoqueCeus, alt: "Representação dos sete céus em arte sacra antiga", caption: "Enoque — os sete céus da visão." },
    { src: enoqueNoe, alt: "Noé e a visão do dilúvio em arte bíblica antiga", caption: "Enoque — Noé e a visão do dilúvio." },
    { src: pd("BL_Or_485_f._102r.png"), alt: "Folha de manuscrito etíope do Livro de Enoque", caption: "Livro de Enoque — manuscrito etíope do século XVI." },
    { src: pd("P._Chester_Beatty_XII,_leaf_3,_verso.jpg"), alt: "Fragmento antigo do Livro de Enoque em grego", caption: "Livro de Enoque — fragmento manuscrito antigo em grego." },
    { src: pd("Figures_God_took_Enoch.jpg"), alt: "Enoque levado por Deus em gravura bíblica antiga", caption: "Enoque — figura levada por Deus em gravura histórica." },
  ],
  esdras: [
    { src: esdras, alt: "Esdras com manuscritos em cenário antigo", caption: "Esdras — o escriba diante dos manuscritos." },
    { src: esdrasJovens, alt: "Três jovens em narrativa bíblica antiga", caption: "Esdras — os três jovens e a prova da fé." },
    { src: esdrasCaravana, alt: "Caravana de sacerdotes em viagem", caption: "Esdras — a caravana dos sacerdotes." },
    { src: pd("Ezra_reading_the_Law.jpg"), alt: "Esdras lendo a Lei em arte antiga", caption: "Esdras — leitura pública da Lei." },
    { src: pd("CodexGigas_211_Ezra,Nehemiah.jpg"), alt: "Página do Codex Gigas com Esdras e Neemias", caption: "Esdras — representação no Codex Gigas medieval." },
    { src: pd("Inwijding_van_de_fundamenten_van_de_tweede_tempel_van_Jeruzalem_Loflied_op_de_muziek_(serietitel)_Encomium_Musices_(serietitel),_RP-P-1963-154.jpg"), alt: "Cerimônia ligada à fundação do templo de Jerusalém", caption: "Esdras — cerimônia e restauração do templo." },
  ],
  judite: [
    { src: judite, alt: "Judite em cenário de guerra do antigo Oriente", caption: "Judite — coragem diante do cerco." },
    { src: juditeGuardas, alt: "Guardas assírios em acampamento antigo", caption: "Judite — o acampamento dos assírios." },
    { src: juditeClamor, alt: "Povo de Israel reunido em oração", caption: "Judite — clamor de Israel." },
    { src: pd("Cpg17_Blatt_253v_-_ATJudit_-_Judit_kniet_vor_Holofernes.jpg"), alt: "Judite ajoelhada diante de Holofernes em manuscrito medieval", caption: "Judite — encontro com Holofernes em manuscrito medieval." },
    { src: pd("Judith_by_Maerten_van_Heemskerck.png"), alt: "Judite em gravura renascentista", caption: "Judite — representação renascentista da heroína bíblica." },
    { src: pd("French_16th_Century,_Holofernes_Interrogating_Achior,_c._1575,_NGA_73903.jpg"), alt: "Holofernes interrogando Aquior em gravura antiga", caption: "Judite — Holofernes e Aquior em gravura do século XVI." },
  ],
  suzana: [
    { src: oracaoSuzana, alt: "Suzana em jardim representado como manuscrito antigo", caption: "Suzana — a cena do jardim." },
    { src: oracaoJardim, alt: "Suzana em oração no jardim", caption: "Suzana — oração e testemunho." },
    { src: oracaoFornalha, alt: "Oração diante da fornalha em arte sacra", caption: "Oração — fé diante da provação." },
    { src: pd("Susanna.jpg"), alt: "Suzana e os anciãos em pintura histórica", caption: "Suzana — o encontro com os anciãos." },
    { src: pd("134.The_Justification_of_Susanna.jpg"), alt: "Justificação de Suzana em gravura de Doré", caption: "Suzana — sua justificação em gravura histórica." },
    { src: pd("Susanna_naar_de_rechtsplaats_geleid_Geschiedenis_van_Susanna_(serietitel),_RP-P-1902-A-22364.jpg"), alt: "Suzana conduzida diante da multidão em gravura", caption: "Suzana — a prova pública e o testemunho." },
  ],
  pai: [
    { src: paiNosso, alt: "Representação antiga do Pai Nosso", caption: "Pai Nosso — a oração em tradição antiga." },
    { src: paiNossoDespertar, alt: "Figura em despertar espiritual em arte sacra", caption: "Pai Nosso — despertar espiritual." },
    { src: paiNossoCosmos, alt: "Céu e cosmos em composição de manuscrito antigo", caption: "Pai Nosso — oração e cosmos." },
    { src: pd("Single_page_of_illumination_from_the_Qur'an_manuscript_made_in_Konya,_1278_(CBL_Is_1466,_f._1a).jpg"), alt: "Página ornamental de manuscrito antigo do Oriente", caption: "Tradição manuscrita oriental — ornamento e contemplação." },
    { src: pd("Illuminated_manuscript_from_Serra_East,_Nubia.jpg"), alt: "Manuscrito iluminado antigo da Núbia", caption: "Manuscrito antigo — arte sacra e tradição oriental." },
    { src: pd("Charles_XII_Bible_(1709)_-_The_Prayer_of_Azariah_and_Song_of_the_Three_Holy_Children_and_Prayer_of_Manassee.jpg"), alt: "Página de Bíblia antiga com orações", caption: "Orações antigas — página ilustrada de uma Bíblia histórica." },
  ],
  sabedoria: [
    { src: sabedoria, alt: "Rei e escribas em cena de sabedoria antiga", caption: "Sabedoria de Salomão — o ensino do sábio." },
    { src: eclesiasticoSabia, alt: "Sábio ensinando discípulos em arte de manuscrito", caption: "Sabedoria — tradição e ensinamento." },
    { src: eclesiasticoSilencio, alt: "Figura em contemplação em arte sacra antiga", caption: "Sabedoria — contemplação e discernimento." },
    { src: pd("Solomon_prays_for_wisdom.jpg"), alt: "Salomão orando por sabedoria em pintura histórica", caption: "Sabedoria de Salomão — o pedido pela sabedoria." },
    { src: pd("Illustration-judgement-of-solomon.jpg"), alt: "Salomão em composição medieval sobre sua sabedoria", caption: "Sabedoria de Salomão — o rei sábio e o templo." },
    { src: pd("Le_Jugement_de_Salomon,_Martial_Desbois,_Tabellae_selectae_ac_Explicatae,_Padoue,_1691_CROP.png"), alt: "Julgamento de Salomão em gravura histórica", caption: "Salomão — julgamento e discernimento em gravura antiga." },
  ],
} satisfies Record<string, Artwork[]>;

const FALLBACK: Artwork[] = [
  ...ART.enoque,
  ...ART.esdras,
  ...ART.judite,
  ...ART.baruque,
  ...ART.sabedoria,
];

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
  if (paragraphCount <= 26) return [
    Math.max(1, Math.floor(paragraphCount * 0.3)),
    Math.max(1, Math.floor(paragraphCount * 0.72)),
  ];
  return [
    Math.max(1, Math.floor(paragraphCount * 0.2)),
    Math.max(1, Math.floor(paragraphCount * 0.48)),
    Math.max(1, Math.floor(paragraphCount * 0.76)),
  ];
}

export function readerIllustrationsFor(
  slug = "",
  chapters = 0,
  paragraphsByChapter: number[] = [],
): ReaderIllustration[] {
  const family = familyForSlug(slug);
  const result: ReaderIllustration[] = [];

  for (let chapterIndex = 0; chapterIndex < chapters; chapterIndex += 1) {
    const paragraphCount = paragraphsByChapter[chapterIndex] ?? 0;
    const positions = positionsForChapter(paragraphCount);

    positions.forEach((afterParagraph, positionIndex) => {
      const art = family[(chapterIndex * 2 + positionIndex) % family.length];
      if (!art) return;
      result.push({
        ...art,
        chapterIndex,
        afterParagraph,
      });
    });
  }

  return result;
}
