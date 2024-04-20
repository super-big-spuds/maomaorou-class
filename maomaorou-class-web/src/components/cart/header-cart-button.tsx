"use client";

import { ShoppingCart, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import { useCart } from "@/provider/cart-provider";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

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

      <DropdownMenuContent className="w-[400px] p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">購物車</h3>
          <Badge className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            {cartData.cart.length} 項物品
          </Badge>
        </div>

        {cartData.cart.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            購物車是空的
          </div>
        )}

        {cartData.cart.map((item) => (
          <div key={item.id} className="space-y-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
              <button onClick={() => cartData.removeFromCart(item.id)}>
                <X className="text-gray-100" />
              </button>
              <div className="space-y-1">
                <h4 className="font-medium">{item.title}</h4>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  課程有效至: {item.expiredAt.toLocaleDateString()}
                </div>
              </div>
              <div className="text-right font-medium">NT${item.price}</div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-gray-500 dark:text-gray-400">總金額</div>
          <div className="font-medium">
            ${cartData.cart.reduce((acc, cur) => acc + cur.price, 0)}
          </div>
        </div>

        <Link className={cn(buttonVariants(), "w-full")} href="/checkout">
          前往結帳
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
