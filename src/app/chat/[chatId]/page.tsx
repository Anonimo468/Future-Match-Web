"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getChatMessages, sendChatMessage, listChats, type ChatMessage } from "@/lib/api";

const FREE_CHAT_LIMIT = 3;

export default function ChatConversationPage() {
  const params = useParams<{ chatId: string }>();
  const supabase = createClient();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [chatCount, setChatCount] = useState<number | null>(null);
  const [loadError, setLoadError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      setLoadError(false);
      const token = await getToken();
      if (!token) return;

      try {
        const [msgs, chats] = await Promise.all([
          getChatMessages(token, params.chatId),
          listChats(token),
        ]);
        setMessages(msgs);
        setChatCount(chats.length);
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    setSending(true);

    // Mostrar el mensaje del usuario de inmediato (optimista)
    setMessages((prev) => [
      ...prev,
      { id: `temp-${Date.now()}`, role: "user", content: text, createdAt: new Date().toISOString() },
    ]);

    const token = await getToken();
    if (!token) {
      setSending(false);
      return;
    }

    try {
      const reply = await sendChatMessage(token, params.chatId, text);
      setMessages((prev) => [
        ...prev,
        { id: `temp-r-${Date.now()}`, role: "assistant", content: reply, createdAt: new Date().toISOString() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `temp-e-${Date.now()}`,
          role: "assistant",
          content: "Uy, no pude responder ahora mismo. Probá de nuevo en un momento.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-fm-purple" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-sm font-medium text-gray-700">No pudimos cargar este chat.</p>
        <p className="max-w-sm text-sm font-light text-gray-500">
          No pudimos conectar con el servidor. Verificá tu conexión e intentá de nuevo.
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
        <h1 className="text-lg font-semibold text-[#1a1a3e]">Chat con Future Match</h1>
        {chatCount !== null && (
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-fm-purple">
            {chatCount}/{FREE_CHAT_LIMIT} chats gratis usados
          </span>
        )}
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-8 py-6">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-fm-purple">
                AI
              </div>
            )}
            <div
              className={`max-w-2xl rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-tr-sm text-white"
                  : "rounded-tl-sm border border-gray-200 bg-gray-100 text-gray-900"
              }`}
              style={m.role === "user" ? { background: "linear-gradient(135deg,#5b21b6,#7c3aed)" } : undefined}
            >
              {m.content}
            </div>
          </motion.div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-fm-purple">
              AI
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-gray-200 bg-gray-100 px-5 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 rounded-full border border-gray-300 px-5 py-3 text-sm outline-none transition-colors focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/20"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
