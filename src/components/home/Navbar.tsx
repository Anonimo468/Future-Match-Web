"use client";

import { useState } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/smoothScroll";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "¿Cómo Funciona?", href: "#como-funciona" },
  { label: "Explorar áreas", href: "#explorar" },
  { label: "Sobre nosotros", href: "#nosotros" },
  { label: "Blog", href: "#blog-posts" },
  { label: "Más", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    smoothScrollTo(href, 1100);
    setOpen(false);
  }

  return (
    <nav className="w-full bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 h-[130px] grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <a href="#inicio" onClick={(e) => handleClick(e, "#inicio")} className="relative h-[120px] w-[180px] shrink-0">
          <Image
            src="/images/logo-future-match.webp"
            alt="Future Match"
            fill
            className="object-contain object-left"
            priority
            sizes="180px"
          />
        </a>

        <ul className="hidden md:flex items-center justify-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="text-[0.875rem] font-medium text-gray-700 hover:text-violet-700 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden p-1.5 col-start-3" onClick={() => setOpen(!open)} aria-label="menu">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)} className="text-sm font-medium text-gray-700 hover:text-violet-700">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
