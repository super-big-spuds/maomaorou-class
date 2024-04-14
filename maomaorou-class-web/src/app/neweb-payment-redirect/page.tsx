"use client";

import { useEffect } from "react";

export default function RedirectToNewebPaymentPage({
  searchParams,
}: {
  searchParams: {
    redirectParam: string;
  };
}) {
  // Redirect to Neweb Payment
  const redirectParam = searchParams.redirectParam;

  useEffect(() => {
    try {
      const parameters = redirectParam.split("&");
      const endpoint = `${parameters[0]}/MPG/mpg_gateway`;
      const form = window.document.createElement("form");
      form.method = "POST";
      form.action = endpoint;
      form.target = "_blank";

      parameters.slice(1, parameters.length).forEach((parameter) => {
        const [key, value] = parameter.split("=");
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
  }, [window, redirectParam]);

  return <div>Redirecting to Neweb Payment...</div>;
}
