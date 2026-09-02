"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { createClient } from "@/lib/supabase/client";
import Boton from "./Boton";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "¿Cómo Funciona?", href: "#como-funciona" },
  { label: "Explorar áreas", href: "#explorar" },
  { label: "Sobre nosotros", href: "#nosotros" },
  { label: "Blog", href: "#blog-posts" },
  { label: "Más", href: "#contacto" },
];

function displayName(user: User) {
  return (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "";
}

function avatarUrl(user: User) {
  return user.user_metadata?.avatar_url as string | undefined;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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
    e.preventDefault();
    smoothScrollTo(href, 1100);
    setOpen(false);
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

        <div className="hidden md:flex items-center justify-self-end">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 transition-colors hover:bg-gray-50"
              >
                {avatarUrl(user) ? (
                  <img
                    src={avatarUrl(user)}
                    alt={displayName(user)}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
                  >
                    {displayName(user).charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="max-w-[140px] truncate text-sm font-medium text-gray-700">
                  {displayName(user)}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg">
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

          <div className="pt-2 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {avatarUrl(user) ? (
                    <img
                      src={avatarUrl(user)}
                      alt={displayName(user)}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
                    >
                      {displayName(user).charAt(0).toUpperCase() || "?"}
                    </div>
                  )}
                  <span className="truncate text-sm font-medium text-gray-700">{displayName(user)}</span>
                </div>
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
