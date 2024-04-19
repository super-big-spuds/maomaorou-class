"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case "/my-orders":
        return "訂單檢視";
      case "/account-setting":
        return "帳號設定";
      case "/change-password":
        return "變更密碼";
      case "/lost-password":
        return "密碼遺失";
      default:
        return "";
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col my-4 h-full">
      <h1 className="text-2xl font-bold">{getTitle(pathname)}</h1>
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
              pathname === "/lost-password" ? "text-gray-600" : "text-gray-200"
            }
            href={"/lost-password"}
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
