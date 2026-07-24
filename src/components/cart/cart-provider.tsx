"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/content/products";
import { trackEvent } from "@/lib/analytics";

export type CartLine = {
  key: string;
  product: Product;
  color: string;
  size: string;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  isOpen: boolean;
};

type CartContextValue = CartState & {
  itemCount: number;
  subtotal: number;
  addItem: (
    product: Product,
    options: { color: string; size: string; quantity?: number },
  ) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
};

type CartAction =
  | { type: "hydrate"; items: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "remove"; key: string }
  | { type: "quantity"; key: string; quantity: number }
  | { type: "open" }
  | { type: "close" }
  | { type: "toggle" }
  | { type: "clear" };

const STORAGE_KEY = "marni-couture-preview-cart";

const CartContext = createContext<CartContextValue | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { ...state, items: action.items };
    case "add": {
      const existing = state.items.find(
        (item) => item.key === action.line.key,
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.key === action.line.key
              ? {
                  ...item,
                  quantity: item.quantity + action.line.quantity,
                }
              : item,
          ),
          isOpen: true,
        };
      }

      return {
        items: [...state.items, action.line],
        isOpen: true,
      };
    }
    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.key !== action.key),
      };
    case "quantity":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.key === action.key
              ? { ...item, quantity: action.quantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "open":
      return { ...state, isOpen: true };
    case "close":
      return { ...state, isOpen: false };
    case "toggle":
      return { ...state, isOpen: !state.isOpen };
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    isOpen: false,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved) as CartLine[];
        dispatch({ type: "hydrate", items });
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state.items),
    );
  }, [hydrated, state.items]);

  const addItem = useCallback(
    (
      product: Product,
      {
        color,
        size,
        quantity = 1,
      }: { color: string; size: string; quantity?: number },
    ) => {
      if (product.status === "sold-out") return;

      const key = `${product.id}:${color}:${size}`;
      dispatch({
        type: "add",
        line: {
          key,
          product,
          color,
          size,
          quantity,
        },
      });

      trackEvent("add_to_cart", {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        color,
        size,
        quantity,
        preview_cart: true,
      });
    },
    [],
  );

  const removeItem = useCallback((key: string) => {
    dispatch({ type: "remove", key });
    trackEvent("remove_from_cart", {
      item_key: key,
      preview_cart: true,
    });
  }, []);

  const updateQuantity = useCallback(
    (key: string, quantity: number) => {
      dispatch({ type: "quantity", key, quantity });
    },
    [],
  );

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    const subtotal = state.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    );

    return {
      ...state,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      openCart: () => dispatch({ type: "open" }),
      closeCart: () => dispatch({ type: "close" }),
      toggleCart: () => dispatch({ type: "toggle" }),
      clearCart: () => dispatch({ type: "clear" }),
    };
  }, [addItem, removeItem, state, updateQuantity]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return value;
}
