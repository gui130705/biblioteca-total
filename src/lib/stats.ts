import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type ReadingSession = {
  id: string;
  book_id: string | null;
  minutes: number;
  pages: number;
  session_date: string;
};

export type ReadingStatsRow = {
  current_streak: number;
  longest_streak: number;
  last_read_date: string | null;
  total_minutes: number;
  total_pages: number;
  books_finished: number;
};

export type ReadingStats = {
  streak: number;
  longestStreak: number;
  totalMinutes: number;
  totalPages: number;
  todayMinutes: number;
  booksFinished: number;
};

const LOCAL_KEY = "bp:reading-sessions";
const LOCAL_GOAL_KEY = "bp:daily-goal";

type LocalSession = { bookId: string | null; minutes: number; pages: number; date: string };

function todayKey(d = new Date()) {
  // Data civil no fuso local (YYYY-MM-DD), evitando o desvio UTC de toISOString().
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Diferença em dias civis entre duas chaves YYYY-MM-DD (b - a). */
function civilDayDiff(a: string, b: string) {
  const ms = new Date(`${b}T12:00:00`).getTime() - new Date(`${a}T12:00:00`).getTime();
  return Math.round(ms / 86400000);
}

function readLocal(): LocalSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as LocalSession[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(list: LocalSession[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list.slice(-500)));
  } catch {
    /* armazenamento indisponível */
  }
}

export function readLocalGoal() {
  if (typeof window === "undefined") return 30;
  const raw = window.localStorage.getItem(LOCAL_GOAL_KEY);
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 30;
}

function localStats(): ReadingStats {
  const sessions = readLocal();
  const byDay = new Map<string, number>();
  let totalMinutes = 0;
  let totalPages = 0;
  for (const s of sessions) {
    totalMinutes += Number(s.minutes) || 0;
    totalPages += Number(s.pages) || 0;
    byDay.set(s.date, (byDay.get(s.date) ?? 0) + (Number(s.minutes) || 0));
  }
  let streak = 0;
  const cursor = new Date();
  if (!byDay.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  for (;;) {
    if (!byDay.has(todayKey(cursor))) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return {
    streak,
    longestStreak: streak,
    totalMinutes: Math.round(totalMinutes),
    totalPages: Math.round(totalPages),
    todayMinutes: Math.round(byDay.get(todayKey()) ?? 0),
    booksFinished: 0,
  };
}

export function useReadingSessions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["reading-sessions", user?.id],
    enabled: Boolean(user),
    queryFn: async (): Promise<ReadingSession[]> => {
      const { data, error } = await supabase
        .from("reading_sessions")
        .select("id, book_id, minutes, pages, session_date")
        .order("session_date", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as ReadingSession[];
    },
  });
}

async function pushSession(input: { bookId: string | null; minutes: number; pages: number; date?: string }) {
  const { error } = await supabase.rpc("log_reading_session", {
    _book_id: input.bookId as unknown as string,
    _minutes: Number(input.minutes.toFixed(2)),
    _pages: Number(input.pages.toFixed(2)),
    _session_date: input.date ?? todayKey(),
  });
  if (error) throw error;
}

export function useLogSession() {
  const client = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { bookId: string; minutes: number; pages: number }) => {
      if (input.minutes <= 0 && input.pages <= 0) return;
      if (!user) {
        writeLocal([
          ...readLocal(),
          {
            bookId: input.bookId,
            minutes: Number(input.minutes.toFixed(2)),
            pages: Number(input.pages.toFixed(2)),
            date: todayKey(),
          },
        ]);
        return;
      }
      await pushSession({ bookId: input.bookId, minutes: input.minutes, pages: input.pages });
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["reading-sessions"] });
      void client.invalidateQueries({ queryKey: ["reading-stats"] });
    },
  });
}

/** Envia ao banco as sessões guardadas no aparelho enquanto a pessoa estava deslogada. */
export function useSyncLocalSessions() {
  const { user } = useAuth();
  const client = useQueryClient();

  useEffect(() => {
    if (!user) return;
    const pending = readLocal();
    if (pending.length === 0) return;
    // Sincroniza em ordem cronológica estritamente crescente para o streak ser calculado corretamente.
    const ordered = [...pending].sort((a, b) => a.date.localeCompare(b.date));
    let active = true;
    void (async () => {
      try {
        for (const s of ordered) {
          await pushSession({ bookId: s.bookId, minutes: s.minutes, pages: s.pages, date: s.date });
        }
        writeLocal([]);
        if (!active) return;
        void client.invalidateQueries({ queryKey: ["reading-stats"] });
        void client.invalidateQueries({ queryKey: ["reading-sessions"] });
      } catch {
        /* tenta novamente na próxima sessão */
      }
    })();
    return () => {
      active = false;
    };
  }, [user, client]);
}

export function useDailyGoal() {
  const client = useQueryClient();
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["daily-goal", user?.id],
    enabled: Boolean(user),
    queryFn: async (): Promise<number> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("daily_goal_minutes")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data?.daily_goal_minutes ?? 30;
    },
  });

  const setGoal = useMutation({
    mutationFn: async (minutes: number) => {
      if (typeof window !== "undefined") window.localStorage.setItem(LOCAL_GOAL_KEY, String(minutes));
      if (!user) return;
      const { error } = await supabase
        .from("profiles")
        .update({ daily_goal_minutes: minutes })
        .eq("id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["daily-goal"] });
    },
  });

  return { goal: user ? (query.data ?? 30) : readLocalGoal(), setGoal };
}

export function useReadingStats() {
  const { user } = useAuth();
  useSyncLocalSessions();

  const query = useQuery({
    queryKey: ["reading-stats", user?.id],
    enabled: Boolean(user),
    queryFn: async (): Promise<ReadingStats> => {
      const [{ data: row, error }, { data: sessions, error: sessionsError }] = await Promise.all([
        supabase
          .from("reading_stats")
          .select("current_streak, longest_streak, last_read_date, total_minutes, total_pages, books_finished")
          .eq("user_id", user!.id)
          .maybeSingle(),
        supabase.from("reading_sessions").select("minutes").eq("session_date", todayKey()),
      ]);
      if (error) throw error;
      if (sessionsError) throw sessionsError;

      const todayMinutes = (sessions ?? []).reduce((sum, s) => sum + (Number(s.minutes) || 0), 0);
      const stats = (row ?? null) as ReadingStatsRow | null;
      // Streak expira apenas quando um dia civil inteiro foi pulado (> 1 dia sem leitura).
      const stale = stats?.last_read_date
        ? civilDayDiff(stats.last_read_date, todayKey()) > 1
        : true;

      return {
        streak: stale ? 0 : (stats?.current_streak ?? 0),
        longestStreak: stats?.longest_streak ?? 0,
        totalMinutes: Math.round(Number(stats?.total_minutes ?? 0)),
        totalPages: Math.round(Number(stats?.total_pages ?? 0)),
        todayMinutes: Math.round(todayMinutes),
        booksFinished: stats?.books_finished ?? 0,
      };
    },
  });

  const fallback = user ? null : localStats();

  return {
    stats:
      fallback ??
      query.data ?? {
        streak: 0,
        longestStreak: 0,
        totalMinutes: 0,
        totalPages: 0,
        todayMinutes: 0,
        booksFinished: 0,
      },
    isLoading: user ? query.isLoading : false,
  };
}
