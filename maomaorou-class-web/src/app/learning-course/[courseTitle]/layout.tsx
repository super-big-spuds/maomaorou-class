import { Metadata } from "next";

export const metadata: Metadata = {
  title: "學習課程",
  description: "貓貓肉課程介紹",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
