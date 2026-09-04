"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertTriangle, RotateCcw, MessageCircle } from "lucide-react";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizProgressBar from "@/components/quiz/QuizProgressBar";
import QuizFooter from "@/components/quiz/QuizFooter";
import LikertScale from "@/components/quiz/LikertScale";
import MultipleChoice from "@/components/quiz/MultipleChoice";
import OpenEnded from "@/components/quiz/OpenEnded";
import { QUESTIONS } from "@/data/quizQuestions";
import { submitQuizAnswers, createChat, ChatLimitReachedError, type PipelineResult } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";

type AnswerValue = number | string;
type Status = "answering" | "submitting" | "done" | "error";

// Guardamos el progreso en localStorage para que un error de red o un
// refresh accidental no borre respuestas ya contestadas (le pasó a un
// usuario en la pregunta 36/50 con mala conexión). Se limpia al llegar
// al resultado o si expiró (48hs) o cambió la cantidad de preguntas.
const QUIZ_STORAGE_KEY = "fm_quiz_progress";
const QUIZ_STORAGE_TTL_MS = 48 * 60 * 60 * 1000;

interface StoredQuizProgress {
  currentIndex: number;
  answers: Record<number, AnswerValue>;
  questionCount: number;
  savedAt: number;
}

function loadStoredProgress(): { currentIndex: number; answers: Record<number, AnswerValue> } | null {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredQuizProgress;
    if (parsed.questionCount !== QUESTIONS.length) return null;
    if (Date.now() - parsed.savedAt > QUIZ_STORAGE_TTL_MS) return null;
    if (Object.keys(parsed.answers).length === 0) return null;
    return { currentIndex: parsed.currentIndex, answers: parsed.answers };
  } catch {
    return null;
  }
}

function saveStoredProgress(currentIndex: number, answers: Record<number, AnswerValue>) {
  try {
    const payload: StoredQuizProgress = { currentIndex, answers, questionCount: QUESTIONS.length, savedAt: Date.now() };
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage puede fallar (modo privado, cuota llena, etc.) — no es crítico
  }
}

function clearStoredProgress() {
  try {
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch {
    // ignorar
  }
}

export default function CuestionarioPage() {
  const router = useRouter();
  const supabase = createClient();
  const [continuingChat, setContinuingChat] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [status, setStatus] = useState<Status>("answering");
  const [progressMessage, setProgressMessage] = useState("Analizando tu perfil...");
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [restoredNotice, setRestoredNotice] = useState(false);

  // Al montar, restauramos progreso guardado (si hay) en vez de arrancar en 0.
  useEffect(() => {
    const stored = loadStoredProgress();
    if (stored) {
      setAnswers(stored.answers);
      setCurrentIndex(stored.currentIndex);
      setRestoredNotice(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Guardamos en cada cambio de respuesta/pregunta mientras se está contestando.
  useEffect(() => {
    if (status !== "answering") return;
    if (Object.keys(answers).length === 0) return;
    saveStoredProgress(currentIndex, answers);
  }, [answers, currentIndex, status]);

  const question = QUESTIONS[currentIndex];
  const isLast = currentIndex === QUESTIONS.length - 1;
  const currentAnswer = answers[question.id];

  function setAnswer(value: AnswerValue) {
    setRestoredNotice(false);
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function hasAnswer() {
    if (question.type === "open") {
      return typeof currentAnswer === "string" && currentAnswer.trim().length > 0;
    }
    return currentAnswer !== undefined && currentAnswer !== null;
  }

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMessage(null);

    const payload = QUESTIONS.map((q) => ({
      questionId: q.id,
      questionText: q.text,
      value: answers[q.id],
    }));

    try {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;

      await submitQuizAnswers(payload, (event) => {
        if (event.step === "done") {
          setResult(event.result);
          setStatus("done");
          clearStoredProgress();
        } else if (event.step === "error") {
          setErrorMessage(event.message);
          setStatus("error");
        } else {
          setProgressMessage(event.message);
        }
      }, userId);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error de conexión con el servidor");
      setStatus("error");
    }
  }

  function handleNext() {
    if (isLast) {
      handleSubmit();
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, QUESTIONS.length - 1));
  }

  function handleBack() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  async function handleContinueChat() {
    if (!result) return;
    setChatError(null);
    setContinuingChat(true);

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      // Sin sesión: mandamos a loguearse. El resultado de este test ya
      // quedó guardado en Supabase (conversationId), así que no se pierde,
      // pero por ahora no retomamos el flujo automáticamente tras el login.
      router.push("/iniciar-sesion?next=/chat");
      return;
    }

    try {
      const chatId = await createChat(token, {
        sourceConversationId: result.conversationId,
        seedMessage: result.finalResponse,
        title: "Sobre tu resultado vocacional",
      });
      router.push(`/chat/${chatId}`);
    } catch (err) {
      if (err instanceof ChatLimitReachedError) {
        setChatError("Ya usaste tus 3 chats gratis. Podés revisar los que ya tenés desde el chat.");
      } else {
        setChatError("No se pudo abrir el chat, intentá de nuevo.");
      }
      setContinuingChat(false);
    }
  }

  // Pantalla: enviando / esperando el pipeline
  if (status === "submitting") {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <QuizHeader />
        <div className="flex flex-1 items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
              <Loader2 className="h-8 w-8 animate-spin text-violet-700" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-[#1a1a3e]">Estamos preparando tu resultado</h1>
            <p className="text-sm font-light leading-relaxed text-gray-500">{progressMessage}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Pantalla: error (ej. falta la API key de IA, o el server no responde)
  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <QuizHeader />
        <div className="flex flex-1 items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-[#1a1a3e]">Algo salió mal</h1>
            <p className="mb-6 text-sm font-light leading-relaxed text-gray-500">{errorMessage}</p>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-700/30"
              style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
            >
              <RotateCcw className="h-4 w-4" />
              Reintentar
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Pantalla: resultado final
  if (status === "done" && result) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <QuizHeader />
        <div className="flex-1 px-6 py-12">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
                <CheckCircle2 className="h-7 w-7 text-violet-700" />
              </div>
              <h1 className="text-2xl font-bold text-[#1a1a3e]">¡Aquí está tu resultado!</h1>
            </motion.div>

            <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-light leading-relaxed text-gray-700">{result.finalResponse}</p>
            </div>

            <h2 className="mb-4 text-lg font-bold text-[#1a1a3e]">Opciones recomendadas para ti</h2>
            <div className="flex flex-col gap-4">
              {result.packagedOptions.map((opt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <span className="mb-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    {opt.type} · {opt.country}
                  </span>
                  <h3 className="mb-1 text-sm font-bold text-[#1a1a3e]">{opt.title}</h3>
                  <p className="mb-2 text-xs font-light text-gray-600">{opt.description}</p>
                  <p className="text-xs font-light italic text-violet-700">{opt.matchReason}</p>
                </motion.div>
              ))}
            </div>

            {chatError && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                {chatError}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={handleContinueChat}
                disabled={continuingChat}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-700/30 transition-opacity disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
              >
                {continuingChat ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                Seguir platicando
              </button>
              <div className="mt-3">
                <Link
                  href={`/chat-invitado?conversationId=${result.conversationId}&seed=${encodeURIComponent(result.finalResponse)}`}
                  className="text-sm text-gray-500 hover:text-fm-purple hover:underline"
                >
                  Probar sin cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla: wizard de preguntas
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <QuizHeader />
      <QuizProgressBar current={currentIndex + 1} total={QUESTIONS.length} />

      {restoredNotice && (
        <div className="mx-auto mt-4 flex w-full max-w-[700px] items-center justify-center gap-2 px-6 text-center text-xs font-medium text-violet-700">
          <RotateCcw className="h-3.5 w-3.5" />
          Retomamos tu progreso guardado, seguí donde lo dejaste.
        </div>
      )}

      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-[700px]"
          >
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-medium text-violet-600">Pregunta {currentIndex + 1}</p>
              <h1 className="text-xl font-bold leading-snug text-[#1a1a3e] md:text-2xl">{question.text}</h1>
            </div>

            <div className="py-2">
              {question.type === "likert" && (
                <LikertScale
                  value={typeof currentAnswer === "number" ? currentAnswer : null}
                  onChange={setAnswer}
                  scaleLabels={question.scaleLabels}
                />
              )}
              {question.type === "multiple" && (
                <MultipleChoice
                  options={question.options}
                  value={typeof currentAnswer === "string" ? currentAnswer : null}
                  onChange={setAnswer}
                />
              )}
              {question.type === "open" && (
                <OpenEnded
                  value={typeof currentAnswer === "string" ? currentAnswer : ""}
                  onChange={setAnswer}
                  placeholder={question.placeholder}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <QuizFooter
        onBack={handleBack}
        onNext={handleNext}
        canGoBack={currentIndex > 0}
        canGoNext={hasAnswer()}
        isLast={isLast}
      />
    </div>
  );
}
