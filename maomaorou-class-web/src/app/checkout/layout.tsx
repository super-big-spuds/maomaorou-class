import { Metadata } from "next";

export const metadata: Metadata = {
  title: "結帳 - 貓貓肉線上課程網站",
  description: "貓貓肉線上課程網站結帳",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
