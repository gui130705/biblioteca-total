import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BOOK_COLUMNS, type Book } from "@/lib/books";
import { useAuth } from "@/hooks/useAuth";

export type OrderItem = {
  book_id: string;
  unit_price_cents: number;
  quantity: number;
};

export type Order = {
  id: string;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
  order_items: OrderItem[] | null;
};

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

export function useOrders() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["orders", user?.id],
    enabled: Boolean(user),
    queryFn: async (): Promise<Order[]> => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, status, total_cents, currency, created_at, order_items(book_id, unit_price_cents, quantity)",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Order[];
    },
  });
}

export function useOwnedBookIds() {
  const { data: orders = [] } = useOrders();
  const owned = new Set<string>();
  for (const order of orders) {
    if (order.status !== "paid") continue;
    for (const item of order.order_items ?? []) owned.add(item.book_id);
  }
  return owned;
}

export function useCreateOrder() {
  const client = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (books: Book[]) => {
      if (!user) throw new Error("Entre na sua conta para finalizar a compra.");
      if (books.length === 0) throw new Error("Carrinho vazio.");
      const total = books.reduce((sum, b) => sum + b.price_cents, 0);
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_cents: total,
          currency: books[0]?.currency ?? "BRL",
          status: "pending",
        })
        .select("id")
        .single();
      if (error) throw error;

      const { error: itemsError } = await supabase.from("order_items").insert(
        books.map((b) => ({
          order_id: order.id,
          book_id: b.id,
          unit_price_cents: b.price_cents,
          quantity: 1,
        })),
      );
      if (itemsError) throw itemsError;
      return order.id;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpsertBook() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }: Partial<Book> & { id: string }) => {
      const update: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (value !== undefined) update[key] = value;
      }
      const { error } = await supabase.from("books").update(update).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
