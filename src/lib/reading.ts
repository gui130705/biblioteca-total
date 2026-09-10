import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type ReadingStatus = "want" | "reading" | "done";

export type ReadingProgress = {
  book_id: string;
  chapter_index: number;
  scroll_ratio: number;
  percent: number;
  status: ReadingStatus;
  last_read_at: string;
};

export type Highlight = {
  id: string;
  book_id: string;
  chapter_index: number;
  paragraph_index: number;
  text: string;
  start_offset: number;
  end_offset: number;
  color: string;
  note: string | null;
  created_at: string;
};

export function useReadingProgress() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["reading-progress", user?.id],
    enabled: Boolean(user),
    queryFn: async (): Promise<ReadingProgress[]> => {
      const { data, error } = await supabase
        .from("reading_progress")
        .select("book_id, chapter_index, scroll_ratio, percent, status, last_read_at")
        .order("last_read_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ReadingProgress[];
    },
  });
}

export function useBookProgress(bookId: string | undefined) {
  const { data = [] } = useReadingProgress();
  return bookId ? (data.find((p) => p.book_id === bookId) ?? null) : null;
}

export function useSaveProgress() {
  const client = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: {
      bookId: string;
      chapterIndex?: number;
      scrollRatio?: number;
      percent?: number;
      status?: ReadingStatus;
    }) => {
      if (!user) return;
      const { error } = await supabase.from("reading_progress").upsert(
        {
          user_id: user.id,
          book_id: input.bookId,
          ...(input.chapterIndex !== undefined ? { chapter_index: input.chapterIndex } : {}),
          ...(input.scrollRatio !== undefined ? { scroll_ratio: input.scrollRatio } : {}),
          ...(input.percent !== undefined ? { percent: input.percent } : {}),
          ...(input.status ? { status: input.status } : {}),
          last_read_at: new Date().toISOString(),
        },
        { onConflict: "user_id,book_id" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["reading-progress"] });
    },
  });
}

export function useHighlights(bookId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["highlights", user?.id, bookId ?? "all"],
    enabled: Boolean(user),
    queryFn: async (): Promise<Highlight[]> => {
      let query = supabase
        .from("highlights")
        .select(
          "id, book_id, chapter_index, paragraph_index, text, start_offset, end_offset, color, note, created_at",
        )
        .order("created_at", { ascending: false });
      if (bookId) query = query.eq("book_id", bookId);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Highlight[];
    },
  });
}

export function useCreateHighlight() {
  const client = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: {
      bookId: string;
      chapterIndex: number;
      paragraphIndex: number;
      text: string;
      startOffset: number;
      endOffset: number;
      note?: string | null;
    }) => {
      if (!user) throw new Error("Entre na sua conta para salvar marcações.");
      const { error } = await supabase.from("highlights").insert({
        user_id: user.id,
        book_id: input.bookId,
        chapter_index: input.chapterIndex,
        paragraph_index: input.paragraphIndex,
        text: input.text,
        start_offset: input.startOffset,
        end_offset: input.endOffset,
        note: input.note ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
}

export function useUpdateHighlightNote() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string | null }) => {
      const { error } = await supabase.from("highlights").update({ note }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
}

export function useDeleteHighlight() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("highlights").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
}
