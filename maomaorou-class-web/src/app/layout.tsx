import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/provider/apollo-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { CartProvider } from "@/provider/cart-provider";
import { UserProvider } from "@/provider/user-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

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
              <main className="grow bg-gray-50">{children}</main>
              <Toaster />
              <Footer />
            </CartProvider>
          </UserProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
