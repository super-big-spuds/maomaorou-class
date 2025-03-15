"use client";

import LineImage from "../static/btn_base.png";
import Image from "next/image";

export default function LineButton() {
  const handleClick = () => {
    window.open("https://lin.ee/qmbN9x7", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed right-10 bottom-10 bg-[#06C755] w-16 h-16 rounded-full"
    >
      <Image src={LineImage} alt="line" />
    </button>
  );
}
