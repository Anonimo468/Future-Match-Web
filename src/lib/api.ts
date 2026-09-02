export type PipelineProgressEvent =
  | { step: "analyzing_profile"; message: string }
  | { step: "searching_options"; message: string }
  | { step: "packaging_options"; message: string }
  | { step: "generating_response"; message: string }
  | { step: "done"; result: PipelineResult }
  | { step: "error"; message: string };

export interface PipelineResult {
  extractedProfile: {
    interests: string[];
    skills: string[];
    preferredCountry: string;
    studyOrWorkMode: string;
    summary: string;
  };
  geminiResults: unknown;
  packagedOptions: Array<{
    title: string;
    type: "universidad" | "empleo" | "empresa";
    description: string;
    matchReason: string;
    country: string;
  }>;
  finalResponse: string;
  durationMs: number;
  conversationId: string;
}

export interface QuizAnswerPayload {
  questionId: number;
  questionText: string;
  value: number | string;
}

export interface ChatSummary {
  id: string;
  title: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/**
 * Manda las respuestas del cuestionario al backend y consume el stream SSE
 * de progreso del pipeline, llamando a onEvent por cada paso que llega.
 */
export async function submitQuizAnswers(
  answers: QuizAnswerPayload[],
  onEvent: (event: PipelineProgressEvent) => void,
  userId?: string
): Promise<void> {
  const res = await fetch(`${API_URL}/api/vocational-guidance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, userId }),
  });

  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Error al conectar con el servidor (${res.status}): ${errText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Los eventos SSE vienen separados por doble salto de línea:
    // "data: {...}\n\n"
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data:")) continue;
      const jsonStr = line.slice("data:".length).trim();
      if (!jsonStr) continue;
      try {
        const event = JSON.parse(jsonStr) as PipelineProgressEvent;
        onEvent(event);
      } catch {
        // Ignorar líneas que no sean JSON válido (no debería pasar, pero
        // por robustez ante algún chunk cortado a mitad de camino)
      }
    }
  }
}

// ===== Chat (requiere sesión — el token se pasa desde el componente) =====

class ChatLimitReachedError extends Error {
  constructor() {
    super("chat_limit_reached");
  }
}

function authHeaders(accessToken: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` };
}

export async function listChats(accessToken: string): Promise<ChatSummary[]> {
  const res = await fetch(`${API_URL}/api/chats`, { headers: authHeaders(accessToken) });
  if (!res.ok) throw new Error("No se pudieron cargar tus chats");
  const data = await res.json();
  return data.chats;
}

export async function createChat(
  accessToken: string,
  params: { sourceConversationId?: string; seedMessage?: string; title?: string }
): Promise<string> {
  const res = await fetch(`${API_URL}/api/chats`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify(params),
  });

  if (res.status === 403) {
    throw new ChatLimitReachedError();
  }
  if (!res.ok) throw new Error("No se pudo crear el chat");

  const data = await res.json();
  return data.chatId;
}

export async function getChatMessages(accessToken: string, chatId: string): Promise<ChatMessage[]> {
  const res = await fetch(`${API_URL}/api/chats/${chatId}/messages`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) throw new Error("No se pudieron cargar los mensajes");
  const data = await res.json();
  return data.messages;
}

export async function sendChatMessage(
  accessToken: string,
  chatId: string,
  message: string
): Promise<string> {
  const res = await fetch(`${API_URL}/api/chats/${chatId}/messages`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("No se pudo enviar el mensaje");
  const data = await res.json();
  return data.reply;
}

export { ChatLimitReachedError };

// ===== Chat invitado (sin sesión — se identifica con un guestId guardado
// en localStorage, en vez de un token de auth) =====

const GUEST_ID_KEY = "fm_guest_id";

/**
 * Devuelve el guestId guardado en este navegador, generando uno nuevo
 * (crypto.randomUUID) la primera vez.
 */
export function getOrCreateGuestId(): string {
  const existing = localStorage.getItem(GUEST_ID_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID();
  localStorage.setItem(GUEST_ID_KEY, id);
  return id;
}

function guestHeaders() {
  return { "Content-Type": "application/json" };
}

export async function createGuestChat(params: {
  guestId: string;
  sourceConversationId?: string;
  seedMessage?: string;
}): Promise<string> {
  const res = await fetch(`${API_URL}/api/guest/chats`, {
    method: "POST",
    headers: guestHeaders(),
    body: JSON.stringify(params),
  });

  if (res.status === 403) {
    throw new ChatLimitReachedError();
  }
  if (!res.ok) throw new Error("No se pudo crear el chat");

  const data = await res.json();
  return data.chatId;
}

export async function getGuestChatMessages(guestId: string, chatId: string): Promise<ChatMessage[]> {
  const res = await fetch(
    `${API_URL}/api/guest/chats/${chatId}/messages?guestId=${encodeURIComponent(guestId)}`
  );
  if (!res.ok) throw new Error("No se pudieron cargar los mensajes");
  const data = await res.json();
  return data.messages;
}

export async function sendGuestChatMessage(
  guestId: string,
  chatId: string,
  message: string
): Promise<string> {
  const res = await fetch(`${API_URL}/api/guest/chats/${chatId}/messages`, {
    method: "POST",
    headers: guestHeaders(),
    body: JSON.stringify({ guestId, message }),
  });
  if (!res.ok) throw new Error("No se pudo enviar el mensaje");
  const data = await res.json();
  return data.reply;
}
