import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaymentUrl(redirectParamOrUrl: string) {
  const baseUrl = window.location.origin;
  const payRedirectUrl = `${baseUrl}/neweb-payment-redirect?redirectParam=${redirectParamOrUrl}`;
  return payRedirectUrl;
}
