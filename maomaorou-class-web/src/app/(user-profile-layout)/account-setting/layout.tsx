import { Metadata } from "next";

export const metadata: Metadata = {
  title: "帳號設定 - 價量投機線上課程網站",
  description: "價量投機線上課程網站帳號設定",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
