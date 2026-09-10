import { useCallback, useEffect, useState } from "react";

export type ReaderTheme = "escuro" | "sepia" | "papel";
export type ReaderFont = "serif" | "sans";

export type ReaderPrefs = {
  theme: ReaderTheme;
  font: ReaderFont;
  fontSize: number;
  lineHeight: number;
  width: number;
};

const STORAGE_KEY = "biblioteca-proibida-reader-prefs";

export const DEFAULT_PREFS: ReaderPrefs = {
  theme: "escuro",
  font: "serif",
  fontSize: 19,
  lineHeight: 1.8,
  width: 680,
};

export function useReaderPrefs() {
  const [prefs, setPrefs] = useState<ReaderPrefs>(DEFAULT_PREFS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs({ ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<ReaderPrefs>) });
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
