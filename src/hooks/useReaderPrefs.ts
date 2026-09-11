import { useCallback, useEffect, useState } from "react";

export type ReaderTheme = "escuro" | "sepia" | "papel";
export type ReaderFont = "serif" | "sans" | "classica";
export type ReaderMeasure = "estreita" | "media" | "confortavel";
export type ReaderAlign = "esquerda" | "justificado";

export type ReaderPrefs = {
  theme: ReaderTheme;
  font: ReaderFont;
  fontSize: number;
  lineHeight: number;
  measure: ReaderMeasure;
  align: ReaderAlign;
};

const STORAGE_KEY = "biblioteca-proibida-reader-prefs";

export const DEFAULT_PREFS: ReaderPrefs = {
  theme: "escuro",
  font: "serif",
  fontSize: 19,
  lineHeight: 1.78,
  measure: "media",
  align: "esquerda",
};

export const MEASURE_CH: Record<ReaderMeasure, number> = {
  estreita: 58,
  media: 66,
  confortavel: 74,
};

export const READER_FONT_STACK: Record<ReaderFont, string> = {
  serif: '"Merriweather", Georgia, "Times New Roman", serif',
  sans: '"Inter", system-ui, -apple-system, sans-serif',
  classica: '"Lora", "EB Garamond", Garamond, Georgia, serif',
};

export function useReaderPrefs() {
  const [prefs, setPrefs] = useState<ReaderPrefs>(DEFAULT_PREFS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<ReaderPrefs>;
        setPrefs({
          ...DEFAULT_PREFS,
          ...saved,
          measure: saved.measure ?? DEFAULT_PREFS.measure,
          align: saved.align ?? DEFAULT_PREFS.align,
        });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs, hydrated]);

  const update = useCallback((patch: Partial<ReaderPrefs>) => {
    setPrefs((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setPrefs(DEFAULT_PREFS), []);

  return { prefs, update, reset, hydrated };
}
