import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Highlighter,
  List,
  Maximize2,
  Minimize2,
  Minus,
  Moon,
  Plus,
  Settings2,
  StickyNote,
  Sun,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ReaderFigure } from "@/components/ReaderFigure";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBook } from "@/lib/library";
import { bookCoverFor } from "@/lib/book-covers";
import { readerIllustrationsFor } from "@/lib/reader-illustrations";
import { useLogSession } from "@/lib/stats";
import { useAuth } from "@/hooks/useAuth";
import {
  useReaderPrefs,
  MEASURE_CH,
  READER_FONT_STACK,
  type ReaderAlign,
  type ReaderFont,
  type ReaderMeasure,
  type ReaderTheme,
} from "@/hooks/useReaderPrefs";
import {
  computePercent,
  formatMinutes,
  readingMinutes,
  useBookContent,
} from "@/lib/book-content";
import {
  HIGHLIGHT_KINDS,
  type HighlightKind,
  useBookProgress,
  useCreateHighlight,
  useHighlights,
  useSaveProgress,
} from "@/lib/reading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ler/$slug")({
  head: () => ({
    meta: [
      { title: "Leitor imersivo — Biblioteca Proibida" },
      {
        name: "description",
        content:
          "Leia com temas escuro, sépia e papel, tipografia ajustável, progresso, marcações e anotações.",
      },
      { property: "og:title", content: "Leitor imersivo — Biblioteca Proibida" },
      {
        property: "og:description",
        content: "Leitura sem distrações do acervo de livros apócrifos.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reader,
});

type OptionMeta = {
  value: string;
  title: string;
  subtitle: string;
  tooltip: string;
};

const THEMES: OptionMeta[] = [
  {
    value: "escuro",
    title: "Escuro",
    subtitle: "Carvão noturno",
    tooltip: "Contraste suave para leitura noturna; reduz a fadiga ocular.",
  },
  {
    value: "sepia",
    title: "Sépia",
    subtitle: "Papel aquecido",
    tooltip: "Tom amarelado que relaxa a vista em leituras prolongadas.",
  },
  {
    value: "papel",
    title: "Claro",
    subtitle: "Marfim diurno",
    tooltip: "Fundo creme e texto carvão, ideal para ambientes claros.",
  },
];

const FONTS: OptionMeta[] = [
  {
    value: "serif",
    title: "Serifada",
    subtitle: "Clássica e imersiva",
    tooltip: "Letras com serifes que guiam o olhar ao longo da linha.",
  },
  {
    value: "sans",
    title: "Sem serifa",
    subtitle: "Moderna e limpa",
    tooltip: "Formas simples e diretas, ótima para telas de alta resolução.",
  },
  {
    value: "classica",
    title: "Livro",
    subtitle: "Diagramação tradicional",
    tooltip: "Tipografia de livro com proporções clássicas e acabamento editorial.",
  },
];

const MEASURES: OptionMeta[] = [
  {
    value: "estreita",
    title: "Focada",
    subtitle: "55 ch",
    tooltip: "Linha curta que evita cansaço e mantém a atenção no parágrafo.",
  },
  {
    value: "media",
    title: "Equilibrada",
    subtitle: "68 ch",
    tooltip: "A medida clássica de leitura: conforto e ritmo equilibrados.",
  },
  {
    value: "confortavel",
    title: "Ampla",
    subtitle: "80 ch",
    tooltip: "Coluna mais larga para quem prefere menos quebras de linha.",
  },
];

const ALIGNMENTS: OptionMeta[] = [
  {
    value: "esquerda",
    title: "À esquerda",
    subtitle: "Quebra natural",
    tooltip: "Alinhamento à esquerda com espaçamento uniforme entre palavras.",
  },
  {
    value: "justificado",
    title: "Justificado",
    subtitle: "Com hifenização suave",
    tooltip: "Bloco visual elegante, alinhado em ambas as margens.",
  },
];

function OptionButton({
  active,
  onClick,
  title,
  subtitle,
  tooltip,
  theme,
}: OptionMeta & { active: boolean; onClick: () => void; theme: ReaderTheme }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          onClick={onClick}
          aria-pressed={active}
          className={cn(
            "relative h-auto min-h-12 min-w-0 flex-col gap-1 whitespace-normal border-border bg-background py-2.5 text-center text-[13px] leading-tight text-foreground hover:border-primary/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            active &&
              "border-primary bg-primary text-primary-foreground shadow-sm hover:border-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          {active ? <Check className="absolute top-1.5 right-1.5 size-3" aria-hidden="true" /> : null}
          <span className="px-1">{title}</span>
          <span className="px-1 text-xs font-normal leading-snug opacity-90">{subtitle}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className={cn(
          `reader-${theme}`,
          "max-w-[260px] border border-border bg-popover px-3 py-2 text-center text-xs leading-relaxed text-popover-foreground shadow-lg",
        )}
      >
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function Reader() {
  const { slug } = Route.useParams();
  const { data: book, isLoading } = useBook(slug);
  const { data: content, isLoading: loadingContent } = useBookContent(slug);
  const { prefs, update } = useReaderPrefs();
  const { user } = useAuth();

  const progress = useBookProgress(book?.id);
  const saveProgress = useSaveProgress();
  const createHighlight = useCreateHighlight();
  const logSession = useLogSession();
  const { data: highlights = [] } = useHighlights(book?.id);

  const [chapterIndex, setChapterIndex] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [restored, setRestored] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [selection, setSelection] = useState<{
    text: string;
    paragraphIndex: number;
    start: number;
    end: number;
  } | null>(null);
  const [note, setNote] = useState("");
  const [kind, setKind] = useState<HighlightKind>("insight");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [barHidden, setBarHidden] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const startPercent = useRef<number | null>(null);
  const sessionRef = useRef({ seconds: 0, percent: 0, bookId: "", pages: 0 });
  const flushedRef = useRef<{ seconds: number; percent: number | null }>({ seconds: 0, percent: null });

  const chapter = content?.chapters[chapterIndex];
  const coverArt = bookCoverFor(slug);
  const illustrations = readerIllustrationsFor(slug);

  // Restaura o ponto de leitura salvo na conta.
  useEffect(() => {
    if (restored || !content || !progress) return;
    setChapterIndex(Math.min(progress.chapter_index, content.chapters.length - 1));
    setRestored(true);
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: max * progress.scroll_ratio });
    });
  }, [content, progress, restored]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setRatio(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      const delta = y - lastScroll.current;
      if (y < 80) setBarHidden(false);
      else if (delta > 8) setBarHidden(true);
      else if (delta < -8) setBarHidden(false);
      lastScroll.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onMove = (e: MouseEvent) => {
      if (e.clientY < 70) setBarHidden(false);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, [chapterIndex, content]);

  const toggleFocus = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      void el.requestFullscreen?.().catch(() => {});
      setFocusMode(true);
      setBarHidden(true);
    } else {
      void document.exitFullscreen?.().catch(() => {});
      setFocusMode(false);
    }
  }, []);

  useEffect(() => {
    const onChange = () => setFocusMode(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Cronômetro da sessão de leitura (pausa quando a aba fica oculta).
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setSessionSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const percent = useMemo(
    () => (content ? computePercent(content, chapterIndex, ratio) : 0),
    [content, chapterIndex, ratio],
  );

  const remaining = useMemo(() => {
    if (!content) return 0;
    const left = content.words * (1 - percent / 100);
    return readingMinutes(left);
  }, [content, percent]);

  useEffect(() => {
    if (!book) return;
    if (startPercent.current === null && percent > 0) startPercent.current = percent;
    sessionRef.current = {
      seconds: sessionSeconds,
      percent,
      bookId: book.id,
      pages: book.pages ?? 120,
    };
  }, [book, percent, sessionSeconds]);

  // Envia ao banco o que foi lido desde o último envio (periodicamente, ao pausar e ao sair).
  const flushSession = useRef<(min?: number) => void>(() => {});
  flushSession.current = (minSeconds = 30) => {
    const { seconds, percent: end, bookId, pages } = sessionRef.current;
    const seconds0 = flushedRef.current.seconds;
    const elapsed = seconds - seconds0;
    if (!bookId || elapsed < minSeconds) return;
    const from = flushedRef.current.percent ?? startPercent.current ?? end;
    const delta = Math.max(0, end - from);
    flushedRef.current = { seconds, percent: end };
    logSession.mutate({
      bookId,
      minutes: elapsed / 60,
      pages: (delta / 100) * pages,
    });
  };

  useEffect(() => {
    const id = window.setInterval(() => flushSession.current(60), 60000);
    const onHidden = () => {
      if (document.visibilityState === "hidden") flushSession.current(20);
    };
    const onLeave = () => flushSession.current(20);
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("pagehide", onLeave);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("pagehide", onLeave);
      flushSession.current(20);
    };
  }, []);

  // Salva progresso periodicamente.
  const save = useCallback(
    (status?: "reading" | "done") => {
      if (!user || !book || !content) return;
      saveProgress.mutate({
        bookId: book.id,
        chapterIndex,
        scrollRatio: ratio,
        percent,
        status: status ?? (percent >= 98 ? "done" : "reading"),
      });
    },
    [user, book, content, chapterIndex, ratio, percent, saveProgress],
  );

  useEffect(() => {
    if (!user || !book || !content) return;
    const id = window.setInterval(() => save(), 15000);
    return () => window.clearInterval(id);
  }, [user, book, content, save]);

  useEffect(() => {
    return () => {
      /* salva ao sair da tela */
    };
  }, []);

  const goChapter = (index: number) => {
    setChapterIndex(index);
    setTocOpen(false);
    window.scrollTo({ top: 0 });
    save();
  };

  const handleSelection = () => {
    const sel = window.getSelection();
    const text = sel?.toString().trim() ?? "";
    if (!sel || text.length < 4) {
      setSelection(null);
      return;
    }
    const node = sel.anchorNode?.parentElement?.closest("[data-paragraph]");
    const paragraphIndex = node ? Number(node.getAttribute("data-paragraph")) : 0;
    setSelection({
      text: text.slice(0, 2000),
      paragraphIndex,
      start: sel.anchorOffset,
      end: sel.focusOffset,
    });
    setNote("");
  };

  const highlightedParagraphs = useMemo(() => {
    const set = new Set<number>();
    for (const h of highlights) {
      if (h.chapter_index === chapterIndex) set.add(h.paragraph_index);
    }
    return set;
  }, [highlights, chapterIndex]);

  if (isLoading || loadingContent) {
    return (
      <div className="min-h-screen bg-background px-4 py-16">
        <div className="mx-auto h-[70vh] max-w-3xl animate-pulse rounded-xl border border-border bg-card/60" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-display text-3xl font-bold">Livro não encontrado</h1>
          <Button className="mt-6" asChild>
            <Link to="/catalogo">Voltar ao catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!content || !chapter) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-3xl font-bold">Leitura indisponível</h1>
          <p className="mt-3 text-muted-foreground">
            Este título ainda não tem texto preparado para o leitor.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {book.pdf_url ? (
              <Button variant="outline" asChild>
                <a href={book.pdf_url} target="_blank" rel="noreferrer">
                  Abrir PDF
                </a>
              </Button>
            ) : null}
            <Button asChild>
              <Link to="/catalogo">Voltar ao catálogo</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("reader-surface min-h-screen", `reader-${prefs.theme}`)}>
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent">
        <div className="h-full bg-primary transition-[width]" style={{ width: `${percent}%` }} />
      </div>

      <header
        className={cn(
          "reader-bar fixed inset-x-0 top-0 z-30 transition-all duration-300",
          barHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
        )}
        onMouseEnter={() => setBarHidden(false)}
      >
        <div className="mx-auto flex max-w-5xl items-center gap-1 px-3 py-2 sm:px-6">
          <Button variant="ghost" size="icon" asChild aria-label="Voltar">
            <Link to="/livro/$slug" params={{ slug: book.slug }}>
              <ArrowLeft className="size-4" />
            </Link>
          </Button>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="truncate text-[13px] font-medium">{book.title}</p>
            <p className="truncate text-[11px] opacity-55">
              {chapter.title} · {percent}% · {formatMinutes(remaining)} restantes
            </p>
          </div>

          <span
            className="mr-1 hidden items-center gap-1.5 rounded-full border border-current/15 px-2.5 py-1 text-[11px] opacity-70 sm:inline-flex"
            title="Tempo desta sessão"
          >
            <Timer className="size-3" />
            {String(Math.floor(sessionSeconds / 60)).padStart(2, "0")}:
            {String(sessionSeconds % 60).padStart(2, "0")}
          </span>

          <div className="mr-1 hidden items-center gap-0.5 rounded-full border border-current/15 px-1 py-0.5 sm:flex">
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label="Diminuir texto"
              onClick={() => update({ fontSize: Math.max(15, prefs.fontSize - 1) })}
            >
              <Minus className="size-3.5" />
            </Button>
            <span className="text-[11px] opacity-60">A</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label="Aumentar texto"
              onClick={() => update({ fontSize: Math.min(28, prefs.fontSize + 1) })}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Alternar tema de leitura"
            onClick={() => {
              const order: ReaderTheme[] = ["escuro", "sepia", "papel"];
               const next = order[(order.indexOf(prefs.theme) + 1) % order.length];
               if (next) update({ theme: next });
            }}
          >
            {prefs.theme === "escuro" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Modo foco em tela cheia"
            onClick={toggleFocus}
          >
            {focusMode ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </Button>


          <Sheet open={tocOpen} onOpenChange={setTocOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Sumário">
                <List className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Sumário</SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-4 pb-8">
                {content.chapters.map((c, i) => (
                    <Button
                    key={`${c.title}-${i}`}
                      type="button"
                      variant="ghost"
                    onClick={() => goChapter(i)}
                      aria-current={i === chapterIndex ? "location" : undefined}
                    className={cn(
                       "h-auto w-full justify-start rounded-md px-3 py-2 text-left text-sm whitespace-normal hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                       i === chapterIndex && "border border-primary bg-accent font-medium text-accent-foreground",
                    )}
                  >
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2">{c.title}</span>
                        <span className="block text-xs opacity-75">
                          {formatMinutes(readingMinutes(c.words))}
                        </span>
                      </span>
                    </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <TooltipProvider delayDuration={400}>
            <Popover>
              <PopoverTrigger asChild>
                 <Button
                   variant="ghost"
                   size="icon"
                   aria-label="Ajustes de leitura"
                   className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                 >
                  <Settings2 className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className={cn(
                  `reader-${prefs.theme}`,
                   "max-h-[min(82vh,720px)] w-[min(22rem,calc(100vw-1.5rem))] space-y-6 overflow-y-auto border-border bg-popover p-5 text-popover-foreground shadow-xl",
                )}
              >
                <div>
                  <p className="text-sm font-semibold">
                    Ambiente visual
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    A luz do leitor muda o clima da página sem alterar o conteúdo.
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {THEMES.map((t) => (
                      <OptionButton
                        key={t.value}
                        {...t}
                        theme={prefs.theme}
                        active={prefs.theme === t.value}
                        onClick={() => update({ theme: t.value as ReaderTheme })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">Tipografia</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Escolha a voz tipográfica que melhor acompanha o texto.
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {FONTS.map((f) => (
                      <OptionButton
                        key={f.value}
                        {...f}
                        theme={prefs.theme}
                        active={prefs.font === f.value}
                        onClick={() => update({ font: f.value as ReaderFont })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Escala da fonte
                    </p>
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">
                      {prefs.fontSize}px
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                           className="size-8 shrink-0 border-border bg-background text-foreground hover:border-primary/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          aria-label="Diminuir fonte"
                          onClick={() =>
                            update({ fontSize: Math.max(15, prefs.fontSize - 1) })
                          }
                        >
                          <Minus className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className={cn(`reader-${prefs.theme}`, "max-w-[260px] border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground shadow-md")}>
                        <p>Reduz o tamanho da letra em 1 px.</p>
                      </TooltipContent>
                    </Tooltip>
                    <Slider
                      className="flex-1"
                      aria-label="Escala da fonte"
                      min={15}
                      max={28}
                      step={1}
                      value={[prefs.fontSize]}
                      onValueChange={([v]) => update({ fontSize: v ?? prefs.fontSize })}
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                           className="size-8 shrink-0 border-border bg-background text-foreground hover:border-primary/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          aria-label="Aumentar fonte"
                          onClick={() =>
                            update({ fontSize: Math.min(28, prefs.fontSize + 1) })
                          }
                        >
                          <Plus className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className={cn(`reader-${prefs.theme}`, "max-w-[260px] border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground shadow-md")}>
                        <p>Aumenta o tamanho da letra em 1 px.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Espaçamento entre linhas
                    </p>
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">
                      {prefs.lineHeight.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                           className="size-8 shrink-0 border-border bg-background text-foreground hover:border-primary/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          aria-label="Diminuir entrelinha"
                          onClick={() =>
                            update({ lineHeight: Math.max(1.4, prefs.lineHeight - 0.1) })
                          }
                        >
                          <Minus className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className={cn(`reader-${prefs.theme}`, "max-w-[260px] border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground shadow-md")}>
                        <p>Linhas mais compactas para blocos densos.</p>
                      </TooltipContent>
                    </Tooltip>
                    <Slider
                      className="flex-1"
                      aria-label="Espaçamento entre linhas"
                      min={1.4}
                      max={2.4}
                      step={0.1}
                      value={[prefs.lineHeight]}
                      onValueChange={([v]) =>
                        update({ lineHeight: v ?? prefs.lineHeight })
                      }
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                           className="size-8 shrink-0 border-border bg-background text-foreground hover:border-primary/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          aria-label="Aumentar entrelinha"
                          onClick={() =>
                            update({ lineHeight: Math.min(2.4, prefs.lineHeight + 0.1) })
                          }
                        >
                          <Plus className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className={cn(`reader-${prefs.theme}`, "max-w-[260px] border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground shadow-md")}>
                        <p>Linhas mais soltas para leitura relaxada.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Largura da coluna
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Uma medida equilibrada reduz o cansaço visual.
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {MEASURES.map((m) => (
                      <OptionButton
                        key={m.value}
                        {...m}
                        theme={prefs.theme}
                        active={prefs.measure === m.value}
                        onClick={() => update({ measure: m.value as ReaderMeasure })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Disposição do texto
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Ajuste o desenho do parágrafo ao seu ritmo de leitura.
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {ALIGNMENTS.map((a) => (
                      <OptionButton
                        key={a.value}
                        {...a}
                        theme={prefs.theme}
                        active={prefs.align === a.value}
                        onClick={() => update({ align: a.value as ReaderAlign })}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </TooltipProvider>

          {book.pdf_url ? (
            <Button variant="ghost" size="icon" asChild aria-label="Baixar PDF original">
              <a href={book.pdf_url} download>
                <Download className="size-4" />
              </a>
            </Button>
          ) : null}
        </div>
      </header>

      <main
        ref={bodyRef}
        onMouseUp={handleSelection}
        onTouchEnd={handleSelection}
        className="mx-auto w-full px-5 pt-24 pb-32"
        style={{
          maxWidth: `${MEASURE_CH[prefs.measure]}ch`,
          fontSize: `${prefs.fontSize}px`,
        }}
      >
        {chapterIndex === 0 && coverArt ? (
          <ReaderFigure
            src={coverArt.src}
            alt={coverArt.alt}
            caption={`${book.title} — abertura da obra`}
            variant="cover"
            eager
          />
        ) : null}

        <p className="text-xs tracking-[0.25em] uppercase opacity-60">{book.title}</p>
        <h1
          className="mt-3 text-2xl font-bold sm:text-3xl"
          style={{ fontFamily: READER_FONT_STACK[prefs.font] }}
        >
          {chapter.title}
        </h1>

        <div
          className={cn("reader-text mt-8", `reader-align-${prefs.align}`)}
          style={{
            fontSize: `${prefs.fontSize}px`,
            lineHeight: prefs.lineHeight,
            fontFamily: READER_FONT_STACK[prefs.font],
          }}
        >
          {chapter.paragraphs.map((p, i) => (
            <Fragment key={i}>
              <p
                data-paragraph={i}
                className={cn(
                  i === 0 && p.length > 80 && "reader-dropcap",
                  highlightedParagraphs.has(i) && "reader-marked",
                )}
              >
                {p}
              </p>
              {illustrations.map((item, itemIndex) =>
                item.chapterIndex === chapterIndex && item.afterParagraph === i ? (
                  <ReaderFigure
                    key={`illustration-${itemIndex}`}
                    src={item.src}
                    alt={item.alt}
                    caption={item.caption}
                  />
                ) : null,
              )}
            </Fragment>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between gap-3 border-t pt-6 opacity-90">
          <Button
            variant="outline"
            size="sm"
            disabled={chapterIndex === 0}
            onClick={() => goChapter(chapterIndex - 1)}
          >
            <ChevronLeft className="size-4" />
            Anterior
          </Button>
          {chapterIndex < content.chapters.length - 1 ? (
            <Button size="sm" onClick={() => goChapter(chapterIndex + 1)}>
              Próximo
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                save("done");
                toast.success("Livro marcado como concluído.");
              }}
            >
              <Check className="size-4" />
              Concluir livro
            </Button>
          )}
        </div>
      </main>

      {selection ? (
         <div
           className={cn(
             `reader-${prefs.theme}`,
             "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-4 text-card-foreground backdrop-blur",
           )}
         >
          <div className="mx-auto max-w-3xl space-y-3">
            <p className="line-clamp-2 text-sm text-muted-foreground italic">“{selection.text}”</p>
            <div className="flex flex-wrap gap-1.5">
              {HIGHLIGHT_KINDS.map((k) => (
                <Button
                  key={k.value}
                  size="sm"
                  variant={kind === k.value ? "default" : "outline"}
                   aria-pressed={kind === k.value}
                   className={cn(
                     "h-8 border-border px-3 text-xs hover:border-primary/70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                     kind === k.value &&
                       "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                   )}
                  onClick={() => setKind(k.value)}
                >
                  {k.label}
                </Button>
              ))}
            </div>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escreva uma anotação (opcional)"
              rows={2}
            />
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  void navigator.clipboard.writeText(selection.text);
                  toast.success("Trecho copiado.");
                }}
              >
                <Copy className="size-4" />
                Copiar
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelection(null)}>
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (!user) {
                    toast.error("Entre na sua conta para salvar marcações.");
                    return;
                  }
                  createHighlight.mutate(
                    {
                      bookId: book.id,
                      chapterIndex,
                      paragraphIndex: selection.paragraphIndex,
                      text: selection.text,
                      startOffset: selection.start,
                      endOffset: selection.end,
                      kind,
                      note: note.trim() || null,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Trecho salvo nas suas anotações.");
                        setSelection(null);
                        setNote("");
                      },
                      onError: (e) => toast.error((e as Error).message),
                    },
                  );
                }}
              >
                {note.trim() ? <StickyNote className="size-4" /> : <Highlighter className="size-4" />}
                Salvar marcação
              </Button>
            </div>
          </div>
        </div>
      ) : focusMode ? null : (
        <div className="fixed right-4 bottom-4 z-30 flex gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link to="/anotacoes">
              <StickyNote className="size-4" />
              Anotações
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (!user) {
                toast.error("Entre na sua conta para salvar o marca-páginas.");
                return;
              }
              save();
              toast.success("Marca-páginas salvo.");
            }}
          >
            <BookOpen className="size-4" />
            Marcar página
          </Button>
        </div>
      )}
    </div>
  );
}
