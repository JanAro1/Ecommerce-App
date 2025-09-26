import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty = 1 } = action.payload;
      const existing = state.items.find(i => i.id === product.id);
      let items;
      if (existing) {
        items = state.items.map(i =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
        );
      } else {
        items = [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            discountPercentage: product.discountPercentage || 0,
            thumbnail: product.thumbnail,
            brand: product.brand,
            category: product.category,
            qty,
          },
        ];
      }
      return { ...state, items };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const items = state.items
        .map(i => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, 99)) } : i))
        .filter(i => i.qty > 0);
      return { ...state, items };
    }
    case "REMOVE": {
      const items = state.items.filter(i => i.id !== action.payload.id);
      return { ...state, items };
    }
    case "CLEAR": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

const initial = { items: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial, (init) => {
    try {
      const raw = localStorage.getItem("cart:v1");
      return raw ? JSON.parse(raw) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    } catch {}
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const computeLine = (i) => {
    const discounted = Math.round(i.price * (1 - (i.discountPercentage || 0) / 100));
    return { discounted, lineTotal: discounted * i.qty };
  };
  const subtotal = state.items.reduce((sum, i) => sum + computeLine(i).lineTotal, 0);

  const value = { state, dispatch, totalItems, subtotal, computeLine };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}