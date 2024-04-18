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
          {cartData.cart.length !== 0 && (
            <div className="absolute -right-4  bottom-1.5 bg-orange-200 rounded-full w-6 h-6 flex justify-center  items-center ">
              <p>{cartData.cart.length}</p>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      {cartData.cart.length !== 0 && (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>購物車內容</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {cartData.cart.map((item) => (
            <DropdownMenuLabel key={item.id} className=" bg-rose-100">
              <div className="flex justify-between items-center border-b-2">
                <p>{item.title}</p>
                <p>${item.price}</p>
                <button onClick={() => cartData.removeFromCart(item.id)}>
                  X
                </button>
              </div>
            </DropdownMenuLabel>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <Link href="/checkout">前往結帳</Link>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
