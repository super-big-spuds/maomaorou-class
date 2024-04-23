import { Metadata } from "next";

export const metadata: Metadata = {
  title: "學習課程內容 - 貓貓肉線上課程網站",
  description: "貓貓肉線上課程網站學習課程內容",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
