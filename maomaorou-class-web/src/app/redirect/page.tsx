"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const redirectUrl = searchParams.get("redirectUrl");
    if (redirectUrl === null) {
      alert("RedirectUrl is null");
      return;
    }
    window.location.href = redirectUrl;
  }, [router, searchParams]);

  return (
    <>
      <main>為您跳轉畫面中...</main>
    </>
  );
}
