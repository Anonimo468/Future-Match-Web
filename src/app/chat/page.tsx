"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { listChats, createChat, ChatLimitReachedError } from "@/lib/api";
import LimitModal from "@/components/chat/LimitModal";

export default function ChatIndexPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [limitOpen, setLimitOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    async function run() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) return;

      try {
        const chats = await listChats(token);
        if (chats.length > 0) {
          router.replace(`/chat/${chats[0].id}`);
          return;
        }
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      } else {
        setLoadError(true);
      }
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-fm-purple" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
          <MessageCircle className="h-8 w-8 text-fm-purple" />
        </div>
        <h1 className="text-xl font-bold text-[#1a1a3e]">Empezá tu primer chat</h1>
        <p className="max-w-sm text-sm font-light text-gray-500">
          Preguntame lo que quieras sobre carreras, universidades, o seguí explorando tu resultado
          vocacional.
        </p>
        {loadError && (
          <p className="max-w-sm text-sm text-red-600">
            No pudimos conectar con el servidor. Verificá tu conexión e intentá de nuevo.
          </p>
        )}
        <button
          onClick={handleNewChat}
          disabled={creating}
          className="mt-2 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
        >
          {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Nuevo chat
        </button>
      </div>
      <LimitModal open={limitOpen} onClose={() => setLimitOpen(false)} />
    </>
  );
}
