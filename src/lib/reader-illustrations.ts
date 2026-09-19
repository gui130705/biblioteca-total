import baruqueRetorno from "@/assets/reader-illustrations/baruque-retorno-jerusalem.jpg";
import baruqueSiao from "@/assets/reader-illustrations/baruque-siao-em-luto.jpg";
import baruque from "@/assets/reader-illustrations/baruque.jpg";
import belEsterDecreto from "@/assets/reader-illustrations/bel-e-ester-contra-decreto.jpg";
import belEsterDragoes from "@/assets/reader-illustrations/bel-e-ester-dragoes.jpg";
import belEster from "@/assets/reader-illustrations/bel-e-ester.jpg";
import eclesiasticoEscuta from "@/assets/reader-illustrations/eclesiastico-escuta-sabia.jpg";
import eclesiasticoSilencio from "@/assets/reader-illustrations/eclesiastico-silencio.jpg";
import eclesiastico from "@/assets/reader-illustrations/eclesiastico.jpg";
import enoqueNoe from "@/assets/reader-illustrations/enoque-noe-diluvio.jpg";
import enoqueCeus from "@/assets/reader-illustrations/enoque-sete-ceus.jpg";
import enoque from "@/assets/reader-illustrations/enoque.jpg";
import esdrasCaravana from "@/assets/reader-illustrations/esdras-caravana-sacerdotes.jpg";
import esdrasJovens from "@/assets/reader-illustrations/esdras-tres-jovens.jpg";
import esdras from "@/assets/reader-illustrations/esdras.jpg";
import juditeClamor from "@/assets/reader-illustrations/judite-clamor-israel.jpg";
import juditeGuardas from "@/assets/reader-illustrations/judite-guardas-assirios.jpg";
import judite from "@/assets/reader-illustrations/judite.jpg";
import oracaoFornalha from "@/assets/reader-illustrations/oracao-fornalha-orvalho.jpg";
import oracaoSusanaJardim from "@/assets/reader-illustrations/oracao-susana-jardim.jpg";
import oracaoSuzana from "@/assets/reader-illustrations/oracao-e-suzana.jpg";
import paiCosmos from "@/assets/reader-illustrations/pai-nosso-cosmos.jpg";
import paiDespertar from "@/assets/reader-illustrations/pai-nosso-despertar.jpg";
import paiNosso from "@/assets/reader-illustrations/pai-nosso-original.jpg";
import sabedoriaSalomao from "@/assets/reader-illustrations/sabedoria-de-salomao.jpg";

export type ReaderIllustration = {
  src: string;
  alt: string;
  caption: string;
  chapterIndex: number;
  afterParagraph: number;
};

const READER_ILLUSTRATIONS: Record<string, ReaderIllustration[]> = {
  baruque: [
    { src: baruque, alt: "Exilados leem um pergaminho junto aos rios da Babilônia enquanto recordam Jerusalém", caption: "Às margens da Babilônia, a memória de Jerusalém transforma o exílio em oração.", chapterIndex: 0, afterParagraph: 10 },
    { src: baruqueSiao, alt: "Jerusalém em luto representada em uma gravura antiga, com o povo reunido em oração", caption: "Jerusalém em luto: a cidade, a memória e a esperança atravessam o relato.", chapterIndex: 2, afterParagraph: 17 },
    { src: baruqueRetorno, alt: "Caravana de exilados retornando em direção a Jerusalém sob a luz do amanhecer", caption: "O retorno aponta para Jerusalém: a esperança de restauração depois do exílio.", chapterIndex: 4, afterParagraph: 4 },
  ],
  "bel-e-ester": [
    { src: belEster, alt: "Daniel revela a passagem oculta do templo de Bel enquanto Ester se apresenta ao rei persa", caption: "Entre ídolos e palácios, a verdade se revela onde o poder julgava permanecer oculto.", chapterIndex: 0, afterParagraph: 10 },
    { src: belEsterDragoes, alt: "Daniel enfrenta o culto ao dragão em uma cena de manuscrito bíblico antigo", caption: "Daniel diante do dragão: uma cena de confronto entre o culto imperial e a fé.", chapterIndex: 2, afterParagraph: 1 },
    { src: belEsterDecreto, alt: "Ester diante do decreto real em uma composição inspirada em manuscritos persas", caption: "O decreto real muda o destino do povo: Ester entra na narrativa entre palácio e providência.", chapterIndex: 6, afterParagraph: 7 },
  ],
  eclesiastico: [
    { src: eclesiastico, alt: "Um sábio hebreu ensina seus discípulos entre pergaminhos e oliveiras", caption: "A sabedoria transmitida de geração em geração, como luz que amadurece o entendimento.", chapterIndex: 0, afterParagraph: 2 },
    { src: eclesiasticoEscuta, alt: "Um mestre ancião escuta atentamente um discípulo em uma escola de sabedoria antiga", caption: "Escutar antes de responder: a tradição sapiencial valoriza o ouvido atento e o conselho prudente.", chapterIndex: 16, afterParagraph: 7 },
    { src: eclesiasticoSilencio, alt: "Sábio em silêncio diante de pergaminhos, em uma sala iluminada por uma pequena lamparina", caption: "No silêncio do estudo, a sabedoria é ponderada antes de se transformar em palavra.", chapterIndex: 35, afterParagraph: 12 },
  ],
  enoque: [
    { src: enoque, alt: "Enoque contempla os céus, os anjos e as rodas celestes a partir de uma montanha", caption: "Enoque contempla a ordem dos céus e os mistérios confiados aos antigos vigilantes.", chapterIndex: 0, afterParagraph: 1 },
    { src: enoqueCeus, alt: "Enoque atravessa os sete céus em uma visão cósmica de manuscrito antigo", caption: "A visão dos sete céus amplia o horizonte da narrativa e aproxima o leitor do imaginário apocalíptico.", chapterIndex: 19, afterParagraph: 18 },
    { src: enoqueNoe, alt: "Noé contempla o mundo antes do dilúvio em uma gravura bíblica de estilo antigo", caption: "Noé e o dilúvio: a visão profética conecta julgamento, memória e renovação.", chapterIndex: 51, afterParagraph: 30 },
  ],
  esdras: [
    { src: esdras, alt: "Esdras proclama a Lei diante do povo durante a reconstrução de Jerusalém", caption: "A palavra reúne o povo enquanto as pedras de Jerusalém voltam a se erguer.", chapterIndex: 0, afterParagraph: 28 },
    { src: esdrasJovens, alt: "Três jovens diante da fornalha em uma cena de arte sacra bíblica", caption: "Três jovens permanecem firmes diante da fornalha: fé e livramento em linguagem de manuscrito.", chapterIndex: 4, afterParagraph: 31 },
    { src: esdrasCaravana, alt: "Sacerdotes e peregrinos viajam em caravana rumo a Jerusalém em uma paisagem antiga", caption: "A caravana segue rumo à cidade santa, levando pessoas, objetos sagrados e esperança.", chapterIndex: 7, afterParagraph: 45 },
  ],
  judite: [
    { src: judite, alt: "Judite e sua serva entram com coragem no acampamento assírio sob a lua", caption: "Judite atravessa a noite guiada pela coragem, com Betúlia ainda vigilante ao longe.", chapterIndex: 0, afterParagraph: 7 },
    { src: juditeGuardas, alt: "Guardas assírios vigiam o acampamento enquanto Judite se aproxima em uma cena de manuscrito antigo", caption: "Entre tendas e sentinelas, Judite se aproxima do acampamento assírio em segredo.", chapterIndex: 7, afterParagraph: 17 },
    { src: juditeClamor, alt: "O povo de Israel clama e celebra a libertação após a derrota do exército assírio", caption: "O clamor de Israel marca a virada da narrativa e a celebração depois da libertação.", chapterIndex: 14, afterParagraph: 6 },
  ],
  "oracao-e-suzana": [
    { src: oracaoSuzana, alt: "Tríptico sacro com Manassés em oração, os três jovens na fornalha e Susana no jardim", caption: "Da penitência ao livramento: três narrativas unidas pela oração e pela justiça divina.", chapterIndex: 0, afterParagraph: 7 },
    { src: oracaoFornalha, alt: "Três jovens hebreus dentro da fornalha cercados por orvalho em uma gravura sacra", caption: "Na fornalha, o orvalho e a oração tornam-se símbolos de proteção no relato.", chapterIndex: 3, afterParagraph: 24 },
    { src: oracaoSusanaJardim, alt: "Susana no jardim entre árvores antigas enquanto a cena do julgamento se aproxima", caption: "Susana no jardim: a beleza da cena contrasta com a injustiça que será desmascarada.", chapterIndex: 3, afterParagraph: 50 },
  ],
  "pai-nosso-original": [
    { src: paiNosso, alt: "Mestre e discípulos rezam juntos em uma colina diante do mar da Galileia ao amanhecer", caption: "Uma oração partilhada em comunidade, entre o silêncio da manhã e a vastidão do céu.", chapterIndex: 0, afterParagraph: 8 },
    { src: paiDespertar, alt: "Discípulos despertam ao amanhecer enquanto o mestre ensina uma oração em cenário bíblico", caption: "O despertar para a oração: uma composição contemplativa inspirada no ambiente do ensino antigo.", chapterIndex: 0, afterParagraph: 16 },
    { src: paiCosmos, alt: "A oração se eleva sobre uma paisagem cósmica com estrelas e símbolos do céu antigo", caption: "Do cotidiano ao cosmos: a oração é apresentada como uma ponte entre a terra e os céus.", chapterIndex: 0, afterParagraph: 23 },
  ],
  "sabedoria-de-salomao": [
    { src: sabedoriaSalomao, alt: "Salomão contempla a figura luminosa da Sabedoria entre estrelas, balança e oliveira", caption: "A Sabedoria, mais preciosa que o poder, ilumina o juízo e orienta o coração.", chapterIndex: 0, afterParagraph: 7 },
  ],
};

const commonsFile = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1400`;

// Banco externo de manuscritos e iluminuras históricas em domínio público/CC0.
// Ele é usado para impedir que a mesma gravura local seja reciclada em todos os capítulos.
const HISTORY_WEB_ILLUSTRATIONS: ReaderIllustration[] = [
  {
    src: commonsFile("BL Or 485 f. 102r.png"),
    alt: "Página do manuscrito etíope do Livro de Enoque preservado pela British Library",
    caption: "Manuscrito etíope do Livro de Enoque — página histórica preservada pela British Library.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("P. Chester Beatty XII, leaf 3, verso.jpg"),
    alt: "Fragmento de papiro grego com texto do Livro de Enoque",
    caption: "Fragmento antigo do Livro de Enoque em grego, associado aos papiros Chester Beatty.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated manuscript from Serra East, Nubia.jpg"),
    alt: "Manuscrito iluminado da Núbia com figura humana ricamente vestida",
    caption: "Manuscrito iluminado da Núbia medieval, evocando a tradição visual dos antigos textos religiosos.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscript, Bible (part), God appears to Moses and a group of Israelites, Walters Manuscript W.805, fol. 78v.jpg"),
    alt: "Iluminura bíblica medieval mostrando Moisés e um grupo de israelitas",
    caption: "Moisés e os israelitas em uma iluminura bíblica medieval do manuscrito W.805.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscript, Bible (part), Moses before the burning bush, Walters Manuscript W.805, fol. 37v.jpg"),
    alt: "Iluminura medieval de Moisés diante da sarça ardente",
    caption: "Moisés diante da sarça ardente em uma iluminura bíblica medieval.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscript, Bible (part), St. Jerome in his study, Walters Manuscript W.805, fol. 1r.jpg"),
    alt: "São Jerônimo estudando e escrevendo em seu gabinete em uma iluminura medieval",
    caption: "O trabalho do escriba e do estudioso em uma iluminura do manuscrito bíblico W.805.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscript, Bible (part), Naomi and Ruth, Walters Manuscript W.805, fol. 155v.jpg"),
    alt: "Iluminura medieval representando Noemi e Rute",
    caption: "Noemi e Rute em uma iluminura bíblica medieval preservada pelo Walters Art Museum.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("Egmond Gospels - 76 F 1 - 213v.jpg"),
    alt: "Página ricamente iluminada dos Evangelhos de Egmond",
    caption: "Uma página dos Evangelhos de Egmond, manuscrito iluminado do século X.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
  {
    src: commonsFile("15th-century illuminated manuscript art made in Bruges - Book of Hours, Christ before Pilate, Walters Manuscript W.246, fol. 17v (cropped).jpg"),
    alt: "Miniatura medieval mostrando Cristo diante de Pilatos",
    caption: "Miniatura de um manuscrito iluminado de Bruges, com cena bíblica diante de Pilatos.",
    chapterIndex: 0,
    afterParagraph: 0,
  },
];

function buildDistributedIllustrations(slug: string, chapters: number, paragraphsByChapter: number[]): ReaderIllustration[] {
  const specific = READER_ILLUSTRATIONS[slug] ?? [];
  const result: ReaderIllustration[] = [];
  const usedWeb = new Set<string>();

  for (let chapterIndex = 0; chapterIndex < chapters; chapterIndex += 1) {
    const paragraphCount = paragraphsByChapter[chapterIndex] ?? 0;
    if (paragraphCount < 1) continue;

    const positions =
      paragraphCount >= 30
        ? [
            Math.max(0, Math.floor(paragraphCount * 0.2)),
            Math.max(0, Math.floor(paragraphCount * 0.5)),
            Math.max(0, Math.floor(paragraphCount * 0.8)),
          ]
        : paragraphCount >= 10
          ? [
              Math.max(0, Math.floor(paragraphCount * 0.3)),
              Math.max(0, Math.floor(paragraphCount * 0.7)),
            ]
          : [Math.max(0, Math.floor(paragraphCount * 0.5))];

    positions.forEach((afterParagraph, positionIndex) => {
      // Prioriza uma gravura temática própria do livro quando ela existe para este capítulo.
      const chapterSpecific = specific.find(item => item.chapterIndex === chapterIndex);
      const source = chapterSpecific && positionIndex === 0
        ? chapterSpecific
        : HISTORY_WEB_ILLUSTRATIONS.find(item => !usedWeb.has(item.src)) ??
          HISTORY_WEB_ILLUSTRATIONS[(chapterIndex * 2 + positionIndex) % HISTORY_WEB_ILLUSTRATIONS.length];

      usedWeb.add(source.src);
      result.push({
        ...source,
        chapterIndex,
        afterParagraph,
        caption: source.caption.startsWith("Capítulo ")
          ? source.caption
          : `Capítulo ${chapterIndex + 1} — ${source.caption}`,
      });
    });
  }

  const explicit = [...specific];
  const occupied = new Set(explicit.map(item => `${item.chapterIndex}:${item.afterParagraph}`));
  return [
    ...explicit,
    ...result.filter(item => !occupied.has(`${item.chapterIndex}:${item.afterParagraph}`)),
  ];
}

export function readerIllustrationsFor(
  slug?: string,
  chapters = 0,
  paragraphsByChapter: number[] = [],
): ReaderIllustration[] {
  if (!slug) return [];
  return buildDistributedIllustrations(slug, chapters, paragraphsByChapter);
}
