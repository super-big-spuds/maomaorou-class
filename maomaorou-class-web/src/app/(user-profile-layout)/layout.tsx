"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
      <div className="flex justify-center items-center md:items-start h-full gap-4 w-full max-w-3xl relative flex-col">
        {/* Link block */}
        <Card className="flex flex-row justify-around items-center sticky top-16 p-4 w-full bg-white z-30">
          <Link
            className={cn(
              "text-lg w-full text-center",
              pathname === "/my-orders" ? "text-gray-600" : "text-gray-200"
            )}
            href={"/my-orders"}
          >
            訂單檢視
          </Link>
          <Link
            className={cn(
              "text-lg w-full text-center",
              pathname === "/account-setting"
                ? "text-gray-600"
                : "text-gray-200"
            )}
            href={"/account-setting"}
          >
            帳號設定
          </Link>
          <Link
            className={cn(
              "text-lg w-full text-center",
              pathname === "/change-password"
                ? "text-gray-600"
                : "text-gray-200"
            )}
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
