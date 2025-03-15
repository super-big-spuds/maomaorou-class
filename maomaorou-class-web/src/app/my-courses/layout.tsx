import { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的課程 - 價量投機線上課程網站",
  description: "價量投機線上課程網站我的課程檢視",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
