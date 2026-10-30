"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { createClient } from "@/lib/supabase/client";
import { getUserAvatarUrl, getUserName } from "@/lib/user";
import Boton from "./Boton";
import Avatar from "@/components/Avatar";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "¿Cómo Funciona?", href: "#como-funciona" },
  { label: "Explorar áreas", href: "#explorar" },
  { label: "Sobre nosotros", href: "#nosotros" },
  { label: "Blog", href: "#blog-posts" },
  { label: "Planes", href: "/planes" },
  { label: "Más", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#") && isHome) {
      e.preventDefault();
      smoothScrollTo(href, 1100);
    }
    setOpen(false);
  }

  function resolveHref(href: string) {
    return !isHome && href.startsWith("#") ? `/${href}` : href;
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="w-full bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 h-[130px] grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <a
          href={isHome ? "#inicio" : "/"}
          onClick={(e) => handleClick(e, isHome ? "#inicio" : "/")}
          className="relative h-[120px] w-[180px] shrink-0"
          aria-label="Ir al inicio"
        >
          <Image
            src="/images/logo-future-match.webp"
            alt="Future Match"
            fill
            className="object-contain object-left"
            priority
            sizes="180px"
          />
        </a>

        <ul className="hidden lg:flex items-center justify-center gap-4 xl:gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={resolveHref(l.href)}
                onClick={(e) => handleClick(e, l.href)}
                className="text-[0.875rem] font-medium text-gray-700 hover:text-violet-700 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center justify-self-end">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 transition-colors hover:bg-gray-50"
              >
                <Avatar
                  src={getUserAvatarUrl(user)}
                  name={getUserName(user)}
                  className="h-8 w-8"
                  textClassName="text-xs"
                />
                <span className="max-w-[140px] truncate text-sm font-medium text-gray-700">
                  {getUserName(user)}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg">
                  <Link
                    href="/perfil"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/chat"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Mis chats
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Boton href="/iniciar-sesion">Entrar/Registrarse</Boton>
          )}
        </div>

        <button className="lg:hidden p-1.5 col-start-3" onClick={() => setOpen(!open)} aria-label="menu">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a key={l.href} href={resolveHref(l.href)} onClick={(e) => handleClick(e, l.href)} className="text-sm font-medium text-gray-700 hover:text-violet-700">
              {l.label}
            </a>
          ))}

          <div className="pt-2 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={getUserAvatarUrl(user)}
                    name={getUserName(user)}
                    className="h-8 w-8"
                    textClassName="text-xs"
                  />
                  <span className="truncate text-sm font-medium text-gray-700">{getUserName(user)}</span>
                </div>
                <Link href="/perfil" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-violet-700">
                  Perfil
                </Link>
                <Link href="/chat" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 hover:text-violet-700">
                  Mis chats
                </Link>
                <button onClick={handleSignOut} className="text-left text-sm font-medium text-gray-700 hover:text-violet-700">
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Boton href="/iniciar-sesion" className="w-full">Entrar/Registrarse</Boton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
