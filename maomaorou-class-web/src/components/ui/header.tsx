import Link from "next/link";
//import { Menu } from "lucide-react";
//import { Sheet, SheetContent, SheetTrigger } from "./sheet";
//import { Button } from "./button";
import CartButton from "../cart/header-cart-button";
import HeaderUserSection from "../user/header-user-section";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="flex flex-col gap-6 text-lg font-medium">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap"
        >
          MaoMaoRo
        </Link>
      </nav>
      {/*<Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              MaoMaoRou Inc
            </Link>
          </nav>
        </SheetContent>
      </Sheet>*/}
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <HeaderUserSection />
        <CartButton />
      </div>
    </header>
  );
}
