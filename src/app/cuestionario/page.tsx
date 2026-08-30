"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizProgressBar from "@/components/quiz/QuizProgressBar";
import QuizFooter from "@/components/quiz/QuizFooter";
import LikertScale from "@/components/quiz/LikertScale";
import MultipleChoice from "@/components/quiz/MultipleChoice";
import OpenEnded from "@/components/quiz/OpenEnded";
import { QUESTIONS } from "@/data/quizQuestions";

type AnswerValue = number | string;

export default function CuestionarioPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentIndex];
  const isLast = currentIndex === QUESTIONS.length - 1;
  const currentAnswer = answers[question.id];

  function setAnswer(value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function hasAnswer() {
    if (question.type === "open") {
      return typeof currentAnswer === "string" && currentAnswer.trim().length > 0;
    }
    return currentAnswer !== undefined && currentAnswer !== null;
  }

  function handleNext() {
    if (isLast) {
      // TODO: acá se manda `answers` al backend (Fastify) para arrancar
      // el pipeline de las 4 IAs una vez esté conectado.
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, QUESTIONS.length - 1));
  }

  function handleBack() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  if (finished) {
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
              <CheckCircle2 className="h-8 w-8 text-violet-700" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-[#1a1a3e]">¡Listo! Ya tenemos tus respuestas</h1>
            <p className="text-sm font-light leading-relaxed text-gray-500">
              Estamos analizando tu perfil para encontrar las mejores recomendaciones
              vocacionales para ti. Esto tomará solo unos segundos.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <QuizHeader />
      <QuizProgressBar current={currentIndex + 1} total={QUESTIONS.length} />

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
