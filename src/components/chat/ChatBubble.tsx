"use client";

import ReactMarkdown from "react-markdown";

interface AssistantPayload {
  message: string;
  options: string[];
}

// El modelo a veces envuelve el JSON en un bloque de código markdown
// (```json ... ```) a pesar de que el prompt le pide no hacerlo — se lo
// sacamos antes de parsear.
function stripCodeFence(text: string): string {
  const match = text.trim().match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return match ? match[1] : text;
}

function parseAssistantPayload(content: string): AssistantPayload | null {
  try {
    const parsed = JSON.parse(stripCodeFence(content));
    if (parsed && typeof parsed.message === "string" && Array.isArray(parsed.options)) {
      return { message: parsed.message, options: parsed.options.filter((o: unknown) => typeof o === "string") };
    }
    return null;
  } catch {
    return null;
  }
}

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  onOptionClick: (option: string) => void;
}

export default function ChatBubble({ role, content, onOptionClick }: ChatBubbleProps) {
  if (role === "user") {
    return (
      <div
        className="max-w-2xl rounded-2xl rounded-tr-sm px-5 py-3 text-sm leading-relaxed text-white"
        style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
      >
        {content}
      </div>
    );
  }

  const payload = parseAssistantPayload(content);

  if (!payload) {
    return (
      <div className="max-w-2xl rounded-2xl rounded-tl-sm border border-gray-200 bg-gray-100 px-5 py-3 text-sm leading-relaxed text-gray-900">
        {content}
      </div>
    );
  }

  return (
    <div className="flex max-w-2xl flex-col gap-3">
      <div className="rounded-2xl rounded-tl-sm border border-gray-200 bg-gray-100 px-5 py-3 text-sm leading-relaxed text-gray-900 [&_p]:m-0 [&_p+p]:mt-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5">
        <ReactMarkdown>{payload.message}</ReactMarkdown>
      </div>

      {payload.options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {payload.options.map((option, i) => (
            <button
              key={i}
              onClick={() => onOptionClick(option)}
              className="rounded-full border border-violet-700 bg-white px-4 py-2 text-xs font-medium text-violet-700 transition-colors hover:bg-violet-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
