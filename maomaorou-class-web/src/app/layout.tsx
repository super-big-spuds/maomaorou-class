import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/provider/apollo-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { CartProvider } from "@/provider/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ApolloWrapper>
          <CartProvider>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </CartProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
