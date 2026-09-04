export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  short_description: string | null;
  long_description: string | null;
  category: string;
  cover_theme: string;
  price_cents: number;
  currency: string;
  rating: number;
  pages: number | null;
  language: string;
  year: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
};

export const BOOK_COLUMNS =
  "id, slug, title, subtitle, short_description, long_description, category, cover_theme, price_cents, currency, rating, pages, language, year, is_featured, is_published, sort_order";

export const COVER_THEMES: Record<string, { from: string; to: string; accent: string }> = {
  crimson: { from: "#3b0a0a", to: "#7f1d1d", accent: "#f5c542" },
  amber: { from: "#3a2a06", to: "#7c5a10", accent: "#ffe1a1" },
  emerald: { from: "#062a20", to: "#0f5c46", accent: "#a7f3d0" },
  indigo: { from: "#141033", to: "#312e81", accent: "#c7d2fe" },
  violet: { from: "#26093a", to: "#5b21b6", accent: "#e9d5ff" },
  slate: { from: "#0f1418", to: "#334155", accent: "#cbd5e1" },
  ember: { from: "#2b0a02", to: "#7c2d12", accent: "#fdba74" },
};

export const DEFAULT_COVER_THEME = COVER_THEMES["crimson"]!;

export function coverTheme(theme: string) {
  return COVER_THEMES[theme] ?? DEFAULT_COVER_THEME;
}

export function formatPrice(cents: number, currency = "BRL") {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(cents / 100);
}
