import { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的訂單",
  description: "我的訂單",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
