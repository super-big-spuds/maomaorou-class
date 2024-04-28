import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black flex flex-col justify-center items-center py-12">
      <p className="text-white">Copyright ©  2024 MaoMaoRoInc 線上影音網 </p>
      <div className="flex text-blue-500">
        <Link href="/about-us">
          <p>關於我們 |</p>
        </Link>
        <Link href="/terms">
          <p>使用條款 |</p>
        </Link>
        <Link href="/faq">
          <p>常見問題</p>
        </Link>
      </div>
    </footer>
  );
}
