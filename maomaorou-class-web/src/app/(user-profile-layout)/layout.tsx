"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <Card className="flex flex-row md:flex-col gap-4 sticky top-20 whitespace-nowrap p-4">
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
        </Card>

        {/* OrderList block */}
        {children}
      </div>
    </div>
  );
}
