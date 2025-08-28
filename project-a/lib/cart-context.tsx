"use client";

import React, { createContext, useContext, useReducer, type ReactNode } from "react";

interface Course {
  id: number;
  title?: string;
  price: number;
  image?: string;
  instructor?: string;
  duration?: string;
  [key: string]: unknown;
}

interface CartItem extends Course {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Course }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

interface AddItemPayload {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  /** Convenience helper used by pages/components */
  addItem: (item: AddItemPayload) => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        const items = state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
        const itemCount = items.reduce((s, i) => s + i.quantity, 0);
        return { items, total, itemCount };
      }
      const items = [...state.items, { ...action.payload, quantity: 1 }];
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const itemCount = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, itemCount };
    }

    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload);
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const itemCount = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, itemCount };
    }

    case "UPDATE_QUANTITY": {
      const items = state.items
        .map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        )
        .filter((i) => i.quantity > 0);
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const itemCount = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, itemCount };
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  // Keep the helper signature used by pages: { id, name, price, qty }
  const addItem = (item: AddItemPayload) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        title: item.name,
        price: item.price,
        image: "",
        instructor: "",
        duration: "",
      },
    });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  const { state, dispatch, addItem } = ctx;
  return { state, dispatch, addItem };
}
