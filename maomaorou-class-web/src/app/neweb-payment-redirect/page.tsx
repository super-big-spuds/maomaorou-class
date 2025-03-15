"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

type SearchParams = {
  redirectParam: string;
  MerchantID: string;
  TradeInfo: string;
  TradeSha: string;
  Version: string;
};

type KeyOfSearchParams = keyof SearchParams;

export default function RedirectToNewebPaymentPage() {
  const searchParams = useSearchParams()
  const [isError, setIsError] = useState(false)

  // Redirect to Neweb Payment
  useEffect(() => {
    try {
      const redirectParam = searchParams.get('redirectParam')
      const endpoint = `${redirectParam}/MPG/mpg_gateway`;
      const form = window.document.createElement("form");
      form.method = "POST";
      form.action = endpoint;

      const parameterKeys: KeyOfSearchParams[] = [
        "MerchantID",
        "TradeInfo",
        "TradeSha",
        "Version",
      ];

      parameterKeys.forEach((key) => {
        const value = searchParams.get(key);

        if (value === null) {
          throw new Error(`${key}為null`);
        }

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      // Push back
      console.error(error);
      alert("跳轉畫面時發生錯誤, 為您導向至我的訂單頁面進行重新付款")
      setIsError(true)
    }
  }, [searchParams]);

  return (
    <div>
      正在為您跳轉到藍新付款...
      {isError && (
        <Link href='/my-orders'>
          前往我的訂單
        </Link>
      )}
    </div>
  )
}
