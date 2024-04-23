import { Metadata } from "next";

export const metadata: Metadata = {
  title: "訂單檢視 - 貓貓肉線上課程網站",
  description: "貓貓肉線上課程網站訂單檢視",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
