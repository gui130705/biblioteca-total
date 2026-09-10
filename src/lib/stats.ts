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

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
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

export function useLogSession() {
  const client = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { bookId: string; minutes: number; pages: number }) => {
      if (!user || input.minutes <= 0) return;
      const { error } = await supabase.from("reading_sessions").insert({
        user_id: user.id,
        book_id: input.bookId,
        minutes: Number(input.minutes.toFixed(2)),
        pages: Number(input.pages.toFixed(2)),
        session_date: todayKey(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["reading-sessions"] });
    },
  });
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

  return { goal: query.data ?? 30, setGoal };
}

export type ReadingStats = {
  streak: number;
  totalMinutes: number;
  totalPages: number;
  todayMinutes: number;
};

export function computeStats(sessions: ReadingSession[]): ReadingStats {
  const byDay = new Map<string, number>();
  let totalMinutes = 0;
  let totalPages = 0;

  for (const s of sessions) {
    totalMinutes += Number(s.minutes) || 0;
    totalPages += Number(s.pages) || 0;
    byDay.set(s.session_date, (byDay.get(s.session_date) ?? 0) + (Number(s.minutes) || 0));
  }

  let streak = 0;
  const cursor = new Date();
  // A ofensiva continua válida se a pessoa ainda não leu hoje, mas leu ontem.
  if (!byDay.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  for (;;) {
    if (!byDay.has(todayKey(cursor))) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    streak,
    totalMinutes: Math.round(totalMinutes),
    totalPages: Math.round(totalPages),
    todayMinutes: Math.round(byDay.get(todayKey()) ?? 0),
  };
}

export function useReadingStats() {
  const { data: sessions = [], isLoading } = useReadingSessions();
  return { stats: computeStats(sessions), isLoading };
}
