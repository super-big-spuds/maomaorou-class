import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/provider/apollo-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { CartProvider } from "@/provider/cart-provider";
import { UserProvider } from "@/provider/user-provider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import LineButton from "@/components/line-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "價量投機線上課程網站",
  description: "價量投機線上課程網站",
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
          <UserProvider>
            <CartProvider>
              <Header />
              <main className="grow bg-gray-50 p-4">{children}</main>
              <LineButton />
              <Toaster />
              <Footer />
            </CartProvider>
          </UserProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
