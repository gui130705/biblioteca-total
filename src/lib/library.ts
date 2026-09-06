import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BOOK_COLUMNS, type Book } from "@/lib/books";
import { useAuth } from "@/hooks/useAuth";

export function useBooks(includeUnpublished = false) {
  return useQuery({
    queryKey: ["books", includeUnpublished],
    queryFn: async (): Promise<Book[]> => {
      let query = supabase.from("books").select(BOOK_COLUMNS).order("sort_order");
      if (!includeUnpublished) query = query.eq("is_published", true);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Book[];
    },
  });
}

export function useBook(slug: string) {
  return useQuery({
    queryKey: ["book", slug],
    queryFn: async (): Promise<Book | null> => {
      const { data, error } = await supabase
        .from("books")
        .select(BOOK_COLUMNS)
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data as Book | null) ?? null;
    },
  });
}

export function useFavorites() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["favorites", user?.id],
    enabled: Boolean(user),
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase.from("favorites").select("book_id");
      if (error) throw error;
      return (data ?? []).map((row) => row.book_id);
    },
  });
}

export function useToggleFavorite() {
  const client = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ bookId, isFavorite }: { bookId: string; isFavorite: boolean }) => {
      if (!user) throw new Error("Entre na sua conta para favoritar.");
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("book_id", bookId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ book_id: bookId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useUpsertBook() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      is_published,
    }: {
      id: string;
      is_published?: boolean;
    }) => {
      const update: { is_published?: boolean } = {};
      if (is_published !== undefined) update.is_published = is_published;
      const { error } = await supabase.from("books").update(update).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
