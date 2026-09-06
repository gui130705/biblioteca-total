import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "biblioteca-proibida-cart"; // Mantido para preservar bibliotecas já salvas.

type CartContextValue = {
  items: string[];
  add: (bookId: string) => void;
  remove: (bookId: string) => void;
  toggle: (bookId: string) => void;
  clear: () => void;
  has: (bookId: string) => boolean;
  count: number;
};

const CartContext = createContext<CartContextValue>({
  items: [],
  add: () => {},
  remove: () => {},
  toggle: () => {},
  clear: () => {},
  has: () => false,
  count: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((bookId: string) => {
    setItems((prev) => (prev.includes(bookId) ? prev : [...prev, bookId]));
  }, []);
  const remove = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((id) => id !== bookId));
  }, []);
  const toggle = useCallback((bookId: string) => {
    setItems((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]));
  }, []);
  const clear = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        toggle,
        clear,
        has: (id: string) => items.includes(id),
        count: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
