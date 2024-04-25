"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";

type CartItem = {
  id: string;
  title: string;
  price: number;
  expiredAt: Date;
  durationDay: number;
};

const context = createContext({
  cart: [] as CartItem[],
  addToCart: (item: CartItem) => {},
  removeFromCart: (courseId: string) => {},
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
    if (cartData.find((cartItem) => cartItem.id === item.id)) {
      alert("這一個課程已經在購物車裡了");
      return;
    }

    setCartData((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (courseId: string) => {
    setCartData((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== courseId)
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
      const rawCartData = JSON.parse(cart);

      const schema = z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          price: z.number(),
          expiredAt: z.string().transform((v) => new Date(v)),
          durationDay: z.number(),
        })
      );

      const parseResult = schema.safeParse(rawCartData);

      if (!parseResult.success) {
        console.error(parseResult.error);
        clearCart();
        return;
      } else {
        setCartData(parseResult.data);
      }
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
      value={{
        cart: cartData,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </context.Provider>
  );
}
