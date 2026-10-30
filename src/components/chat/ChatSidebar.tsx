"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Plus, Loader2, User as UserIcon, LogOut, Home } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getUserAvatarUrl, getUserName } from "@/lib/user";
import { listChats, createChat, ChatLimitReachedError, type ChatSummary } from "@/lib/api";
import { getChatQuota, type ChatQuota } from "@/lib/quota";
import LimitModal from "./LimitModal";
import Avatar from "@/components/Avatar";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-SV", { day: "numeric", month: "short" });
}

export default function ChatSidebar() {
  const router = useRouter();
  const params = useParams<{ chatId?: string }>();
  const pathname = usePathname();
  const supabase = createClient();
  const menuRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [quota, setQuota] = useState<ChatQuota | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [limitOpen, setLimitOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLabel, setUserLabel] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token || cancelled) return;

      const sessionUser = data.session?.user;
      if (!sessionUser) return;

      setUserLabel(getUserName(sessionUser));
      setAvatarUrl(getUserAvatarUrl(sessionUser));

      const [chatsResult, quotaResult] = await Promise.allSettled([
        listChats(token),
        getChatQuota(token),
      ]);

      if (cancelled) return;

      if (chatsResult.status === "fulfilled") {
        setChats(chatsResult.value);
        setLoadError(false);
      } else {
        setLoadError(true);
      }

      setQuota(quotaResult.status === "fulfilled" ? quotaResult.value : null);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  async function handleNewChat() {
    setCreating(true);
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) {
      setCreating(false);
      return;
    }

    try {
      const chatId = await createChat(token, {});
      router.push(`/chat/${chatId}`);
    } catch (err) {
      if (err instanceof ChatLimitReachedError) {
        setLimitOpen(true);
      }
    } finally {
      setCreating(false);
    }
  }

  return (
    <>
      <aside className="flex h-full w-[280px] shrink-0 flex-col bg-[#111827] text-white">
        <div className="space-y-4 p-4">
          <Link href="/" className="relative block h-[144px] w-[216px]" aria-label="Ir al inicio">
            <Image
              src="/images/logo-future-match.webp"
              alt="Future Match"
              fill
              className="object-contain object-left brightness-0 invert"
              sizes="216px"
            />
          </Link>
          <button
            onClick={handleNewChat}
            disabled={creating}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-fm-purple/60 px-4 py-2.5 text-sm transition-colors hover:bg-fm-purple/20 disabled:opacity-60"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Nuevo chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2">
          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          ) : loadError ? (
            <p className="px-3 py-4 text-center text-xs font-light text-gray-400">
              No pudimos conectar con el servidor. Verificá tu conexión e intentá de nuevo.
            </p>
          ) : chats.length === 0 ? (
            <p className="px-3 py-4 text-center text-xs font-light text-gray-400">
              Todavía no tenés chats. Creá el primero.
            </p>
          ) : (
            chats.map((chat) => {
              const active = params?.chatId === chat.id;
              return (
                <button
                  key={chat.id}
                  onClick={() => router.push(`/chat/${chat.id}`)}
                  className={`mb-1 w-full rounded-lg px-3 py-3 text-left transition-colors ${
                    active ? "bg-fm-purple/90" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm">{chat.title}</div>
                      <div className="mt-0.5 text-xs text-gray-400">{formatDate(chat.createdAt)}</div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="relative border-t border-white/10 p-4" ref={menuRef}>
          {menuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 rounded-lg border border-white/10 bg-[#1a2234] py-1.5 shadow-lg">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-white/5"
              >
                <Home className="h-4 w-4" />
                Inicio
              </Link>
              <Link
                href="/chat/perfil"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-white/5"
              >
                <UserIcon className="h-4 w-4" />
                Ver perfil
              </Link>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-200 hover:bg-white/5"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </div>
          )}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex w-full items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/5"
          >
            <Avatar
              src={avatarUrl}
              name={userLabel}
              className="h-9 w-9"
              textClassName="text-xs"
            />
            <div className="flex-1 truncate text-left text-sm">{userLabel}</div>
          </button>
        </div>
      </aside>

      <LimitModal open={limitOpen} onClose={() => setLimitOpen(false)} plan={quota?.plan} />
    </>
  );
}
