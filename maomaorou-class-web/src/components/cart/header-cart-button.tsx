"use client";

import { ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useCart } from "@/provider/cart-provider";
import Link from "next/link";

export default function CartButton() {
  const cartData = useCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full relative"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Cart</span>
          <div className="absolute right-0 bottom-0 bg-orange-200 rounded-full w-6 h-6 flex justify-center  items-center">
            <p>{cartData.cart.length > 0 ? cartData.cart.length : 0}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>購物車內容</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cartData.cart.map((item) => (
          <DropdownMenuLabel key={item.id}>
            <div className="flex justify-between items-center">
              <p>{item.title}</p>
              <p>${item.price}</p>
              <button onClick={() => cartData.removeFromCart(item)}>X</button>
            </div>
          </DropdownMenuLabel>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <Link href="/checkout">前往結帳</Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
