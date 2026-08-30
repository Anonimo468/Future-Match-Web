"use client";

import Image from "next/image";
import Link from "next/link";

export default function QuizHeader() {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
        <div className="relative h-[64px] w-[96px]">
          <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain object-left" priority sizes="96px" />
        </div>
        <Link href="/" className="text-xs font-medium text-gray-500 hover:text-violet-700 transition-colors">
          Salir
        </Link>
      </div>
    </header>
  );
}
