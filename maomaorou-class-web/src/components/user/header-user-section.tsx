"use client";

import { useUser } from "@/provider/user-provider";
import { CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import useToken from "@/hook/useToken";

export default function HeaderUserSection() {
  const userData = useUser();

  if (userData.isLoading) {
    return <></>;
  }

  return <>{userData.userData !== null ? <UserProfile /> : <GuestProfile />}</>;
}

function UserProfile() {
  const userData = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/my-orders">
            <p>訂單檢視</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/setting">
            <p>帳號設定</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/update-password">
            <p>變更密碼</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/missing-password">
            <p>帳號設定</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <button onClick={userData.handleLogout}>登出</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function GuestProfile() {
  return (
    <div className="flex items-center gap-x-2">
      <Link href="/login">
        <p>登入</p>
      </Link>
      <Link href="/register">
        <p>註冊</p>
      </Link>
    </div>
  );
}
