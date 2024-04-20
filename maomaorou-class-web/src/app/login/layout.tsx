import { Metadata } from "next";

export const metadata: Metadata = {
  title: "登入",
  description: "登入",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
