"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Loader2, Clock, UserPlus } from "lucide-react";
import {
  getOrCreateGuestId,
  createGuestChat,
  getGuestChatMessages,
  sendGuestChatMessage,
  ChatLimitReachedError,
  type ChatMessage,
} from "@/lib/api";
import ChatBubble from "@/components/chat/ChatBubble";

const GUEST_CHAT_ID_KEY = "fm_guest_chat_id";

export default function ChatInvitadoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-fm-purple" />
        </div>
      }
    >
      <ChatInvitadoContent />
    </Suspense>
  );
}

function ChatInvitadoContent() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId") ?? undefined;
  const seed = searchParams.get("seed") ?? undefined;

  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      setLoading(true);
      setLoadError(false);
      setLimitReached(false);

      const guestId = getOrCreateGuestId();
      const existingChatId = localStorage.getItem(GUEST_CHAT_ID_KEY);

      if (existingChatId) {
        try {
          const msgs = await getGuestChatMessages(guestId, existingChatId);
          setChatId(existingChatId);
          setMessages(msgs);
          setLoading(false);
          return;
        } catch {
          // El chat guardado ya no existe (venció o se borró): seguimos
          // abajo para crear uno nuevo.
          localStorage.removeItem(GUEST_CHAT_ID_KEY);
        }
      }

      try {
        const newChatId = await createGuestChat({
          guestId,
          sourceConversationId: conversationId,
          seedMessage: seed,
        });
        localStorage.setItem(GUEST_CHAT_ID_KEY, newChatId);
        setChatId(newChatId);

        const msgs = await getGuestChatMessages(guestId, newChatId);
        setMessages(msgs);
      } catch (err) {
        if (err instanceof ChatLimitReachedError) {
          setLimitReached(true);
        } else {
          setLoadError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(override?: string) {
    const text = (override ?? input).trim();
    if (!text || sending || !chatId) return;

    setInput("");
    setSending(true);

    setMessages((prev) => [
      ...prev,
      { id: `temp-${Date.now()}`, role: "user", content: text, createdAt: new Date().toISOString() },
    ]);

    try {
      const guestId = getOrCreateGuestId();
      const reply = await sendGuestChatMessage(guestId, chatId, text);
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
          content: JSON.stringify({
            message: "Uy, no pude responder ahora mismo. Probá de nuevo en un momento.",
            options: [],
          }),
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  const guestBanner = (
    <div className="flex flex-wrap items-center justify-center gap-2 border-b border-violet-100 bg-violet-50 px-6 py-3 text-center text-sm text-violet-800">
      <Clock className="h-4 w-4 shrink-0" />
      <span>Estás como invitado: este chat se borra en 24 horas.</span>
      <Link href="/registro" className="font-semibold underline hover:text-violet-900">
        Creá una cuenta para guardarlo
      </Link>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        {guestBanner}
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-fm-purple" />
        </div>
      </div>
    );
  }

  if (limitReached) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        {guestBanner}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
            <UserPlus className="h-8 w-8 text-fm-purple" />
          </div>
          <h1 className="text-xl font-bold text-[#1a1a3e]">Ya usaste tu chat gratis</h1>
          <p className="max-w-sm text-sm font-light text-gray-500">
            Como invitado tenés 1 chat gratis. Creá una cuenta para seguir chateando sin límites y
            guardar tu progreso.
          </p>
          <Link
            href="/registro"
            className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-700/30"
            style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
          >
            Crear cuenta gratis
          </Link>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        {guestBanner}
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="text-sm font-medium text-gray-700">No pudimos cargar el chat.</p>
          <p className="max-w-sm text-sm font-light text-gray-500">
            No pudimos conectar con el servidor. Verificá tu conexión e intentá de nuevo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {guestBanner}

      <header className="border-b border-gray-200 bg-white px-8 py-4">
        <h1 className="text-lg font-semibold text-[#1a1a3e]">Chat con Future Match</h1>
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
            <ChatBubble role={m.role} content={m.content} onOptionClick={(opt) => handleSend(opt)} />
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
            onClick={() => handleSend()}
            disabled={sending || !input.trim()}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
