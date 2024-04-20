"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "個人資料",
  description: "貓貓肉個人資料",
};

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center items-center flex-col my-4 h-full">
      <div className="flex justify-center items-center md:items-start h-full gap-x-12 w-full max-w-3xl relative md:flex-row flex-col">
        {/* Link block */}
        <div className="flex flex-row md:flex-col gap-4 sticky top-20 whitespace-nowrap">
          <Link
            className={
              pathname === "/my-orders" ? "text-gray-600" : "text-gray-200"
            }
            href={"/my-orders"}
          >
            訂單檢視
          </Link>
          <Link
            className={
              pathname === "/account-setting"
                ? "text-gray-600"
                : "text-gray-200"
            }
            href={"/account-setting"}
          >
            帳號設定
          </Link>
          <Link
            className={
              pathname === "/change-password"
                ? "text-gray-600"
                : "text-gray-200"
            }
            href={"/change-password"}
          >
            變更密碼
          </Link>
          <Link
            className={
              pathname === "/missing-password"
                ? "text-gray-600"
                : "text-gray-200"
            }
            href={"/missing-password"}
          >
            密碼遺失
          </Link>
        </div>

        {/* OrderList block */}
        {children}
      </div>
    </div>
  );
}
