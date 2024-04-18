"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
};

const context = createContext({
  cart: [] as CartItem[],
  addToCart: (item: CartItem) => {},
  removeFromCart: (item: CartItem) => {},
  clearCart: () => {},
});

export function useCart() {
  const contextData = useContext(context);

  if (!contextData) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return contextData;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartData, setCartData] = useState([] as CartItem[]);

  const addToCart = (item: CartItem) => {
    setCartData((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (item: CartItem) => {
    setCartData((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const clearCart = () => {
    setCartData([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    // Load cart from local storage
    const cart = localStorage.getItem("cart");

    if (cart) {
      setCartData(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      // Save cart to local storage
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }, [cartData]);

  return (
    <context.Provider
      value={{ cart: cartData, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </context.Provider>
  );
}
