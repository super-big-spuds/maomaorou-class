"use client";

import { useEffect } from "react";

type SearchParams = {
  redirectParam: string;
  MerchantID: string;
  TradeInfo: string;
  TradeSha: string;
  Version: string;
};

type KeyOfSearchParams = keyof SearchParams;

export default function RedirectToNewebPaymentPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Redirect to Neweb Payment
  useEffect(() => {
    try {
      const redirectParam = searchParams.redirectParam;
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
        const value = searchParams[key];
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
      window.history.back();
    }
  }, [searchParams]);

  return <div>正在為您跳轉到藍新付款...</div>;
}
