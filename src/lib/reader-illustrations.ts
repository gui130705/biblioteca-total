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

// Ilustrações geradas por IA sob demanda. Cada capítulo recebe uma cena diferente,
// com seed própria, para manter a leitura visualmente fluida sem reciclar a mesma arte.
const aiIllustration = (slug: string, chapterIndex: number, positionIndex: number): ReaderIllustration => {
  const scenes: Record<string, string[]> = {
    enoque: [
      "profeta Enoque diante de uma cidade antediluviana ao entardecer, anjos ao longe, manuscrito bíblico antigo, arte sacra, pintura histórica, pergaminho, iluminação dramática",
      "Enoque contemplando montanhas e os Vigilantes celestes, céu estrelado, atmosfera apocalíptica, manuscrito medieval, arte sacra detalhada",
      "viagem visionária de Enoque pelos céus, portais celestes e estrelas, estética de manuscrito antigo, pintura religiosa histórica",
      "arca de Noé sendo preparada antes do dilúvio, Enoque observando a humanidade, arte bíblica antiga, textura de pergaminho",
      "anjos guardiões diante de uma montanha sagrada, cenário bíblico antigo, iluminura medieval, luz dourada",
    ],
    baruque: [
      "escriba Baruque escrevendo um pergaminho durante o exílio na Babilônia, arquitetura antiga ao fundo, manuscrito bíblico, arte sacra",
      "Jerusalém vista à distância durante o exílio, peregrinos e escribas, atmosfera de esperança, pintura histórica em pergaminho",
      "caravana retornando do exílio em direção a Jerusalém, amanhecer, arquitetura antiga, iluminura bíblica",
    ],
    "bel-e-ester": [
      "Daniel diante do templo de Bel, sacerdotes e estátuas antigas, iluminação dramática, manuscrito bíblico medieval",
      "Daniel enfrentando o grande dragão diante do povo, cenário babilônico, arte sacra histórica, pergaminho",
      "Ester diante do rei em um palácio persa, atmosfera solene, manuscrito antigo, pintura histórica",
    ],
    eclesiastico: [
      "sábio hebreu ensinando discípulos em uma biblioteca antiga, pergaminhos, lamparinas, arte sacra, manuscrito medieval",
      "anciãos conversando sob uma oliveira enquanto um escriba registra ensinamentos, pintura bíblica histórica",
      "escriba estudando silenciosamente à noite, pergaminhos e lamparina, estética de manuscrito antigo",
    ],
    esdras: [
      "Esdras lendo a Lei diante do povo reunido em Jerusalém, arquitetura do templo ao fundo, arte bíblica histórica",
      "sacerdotes carregando pergaminhos durante a reconstrução de Jerusalém, caravanas, manuscrito antigo",
      "povo reunido diante dos muros reconstruídos de Jerusalém, escribas e sacerdotes, iluminura medieval",
    ],
    judite: [
      "Judite caminhando silenciosamente pelo acampamento assírio à noite, tendas e tochas, arte bíblica em manuscrito antigo",
      "Judite diante de Holofernes em uma tenda assíria, atmosfera histórica, iluminura medieval, arte sacra",
      "povo de Betúlia celebrando após a libertação, muralhas antigas, bandeiras e tochas, pintura bíblica histórica",
    ],
    "oracao-e-suzana": [
      "jovens hebreus orando antes da fornalha, luz celestial, cenário bíblico, arte sacra medieval",
      "Susana caminhando por um jardim antigo entre árvores e fontes, atmosfera solene, iluminura bíblica",
      "Daniel defendendo Susana diante dos anciãos, multidão reunida, manuscrito medieval, pintura histórica",
    ],
    "pai-nosso-original": [
      "Jesus ensinando uma oração aos discípulos ao amanhecer, colina da Galileia, atmosfera contemplativa, arte sacra histórica",
      "discípulos reunidos em oração diante do mar da Galileia, céu dourado, manuscrito bíblico antigo",
      "oração subindo simbolicamente aos céus sobre uma paisagem antiga, estrelas e luz celestial, iluminura medieval",
    ],
    "sabedoria-de-salomao": [
      "rei Salomão meditando sobre a Sabedoria entre pergaminhos e colunas do templo, arte sacra histórica",
      "personificação da Sabedoria iluminando um escriba em uma biblioteca antiga, manuscrito medieval, pintura dourada",
      "Salomão aconselhando jovens diante do templo, pergaminhos e oliveiras, arte bíblica antiga",
    ],
  };

  const list = scenes[slug] ?? scenes.enoque;
  const prompt = list[(chapterIndex * 3 + positionIndex) % list.length];
  const seed = chapterIndex * 100 + positionIndex + slug.length;
  const encoded = encodeURIComponent(
    `${prompt}, sem texto, sem letras, composição vertical, alta definição, estilo consistente de manuscrito bíblico antigo`,
  );

  return {
    src: `https://image.pollinations.ai/prompt/${encoded}?width=900&height=1200&seed=${seed}&nologo=true`,
    alt: `Ilustração gerada por IA para o capítulo ${chapterIndex + 1} de ${slug}`,
    caption: `Capítulo ${chapterIndex + 1} — Ilustração temática gerada por IA para acompanhar a narrativa.`,
    chapterIndex,
    afterParagraph: 0,
  };
};

// Ilustrações históricas externas em domínio público/CC0, usadas como apoio quando necessário.
const HISTORY_WEB_ILLUSTRATIONS: ReaderIllustration[] = [
  {
    src: commonsFile("Illuminated Manuscripts (Middleton) figure12.jpg"),
    alt: "Miniatura medieval de Cristo em majestade",
    caption: "Miniatura histórica de manuscrito medieval em domínio público.", chapterIndex: 0, afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscripts (Middleton) figure35.jpg"),
    alt: "Inicial ornamentada de manuscrito medieval",
    caption: "Inicial ornamentada de manuscrito histórico em domínio público.", chapterIndex: 0, afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscripts (Middleton) figure41.jpg"),
    alt: "Ornamentação de manuscrito medieval",
    caption: "Ornamentação medieval preservada em fonte histórica de domínio público.", chapterIndex: 0, afterParagraph: 0,
  },
  {
    src: commonsFile("Paris Bible.jpg"),
    alt: "São Paulo escrevendo em uma Bíblia medieval",
    caption: "São Paulo escrevendo em uma iluminura medieval — imagem CC0.", chapterIndex: 0, afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscript, Bible (part), Creation of the world, and Eve, Walters Manuscript W.805, fol. 6v.jpg"),
    alt: "Criação do mundo e Eva em manuscrito bíblico medieval",
    caption: "Criação do mundo e Eva em iluminura bíblica medieval — imagem CC0.", chapterIndex: 0, afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscript, Bible (part), God appears to Moses and a group of Israelites, Walters Manuscript W.805, fol. 78v.jpg"),
    alt: "Moisés e os israelitas em manuscrito bíblico medieval",
    caption: "Moisés e os israelitas em iluminura bíblica medieval — imagem CC0.", chapterIndex: 0, afterParagraph: 0,
  },
  {
    src: commonsFile("Illuminated Manuscript, Bible (part), Naomi and Ruth, Walters Manuscript W.805, fol. 155v.jpg"),
    alt: "Noemi e Rute em manuscrito bíblico medieval",
    caption: "Noemi e Rute em iluminura bíblica medieval — imagem CC0.", chapterIndex: 0, afterParagraph: 0,
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
