import { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的訂單  - 貓貓肉線上課程網站",
  description: "貓貓肉線上課程網站我的訂單",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
