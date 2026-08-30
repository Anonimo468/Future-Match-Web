export type QuestionType = "likert" | "multiple" | "open";

export interface LikertQuestion {
  id: number;
  type: "likert";
  text: string;
  scaleLabels: [string, string, string, string, string];
}

export interface MultipleQuestion {
  id: number;
  type: "multiple";
  text: string;
  options: string[];
}

export interface OpenQuestion {
  id: number;
  type: "open";
  text: string;
  placeholder: string;
}

export type Question = LikertQuestion | MultipleQuestion | OpenQuestion;

// Escalas reutilizadas según el tipo de afirmación/pregunta
const AGREEMENT_SCALE: [string, string, string, string, string] = [
  "Muy en desacuerdo",
  "En desacuerdo",
  "Neutral",
  "De acuerdo",
  "Muy de acuerdo",
];

const SKILL_SCALE: [string, string, string, string, string] = [
  "Nada bueno/a",
  "Poco bueno/a",
  "Regular",
  "Bueno/a",
  "Muy bueno/a",
];

const IMPORTANCE_SCALE: [string, string, string, string, string] = [
  "Nada importante",
  "Poco importante",
  "Neutral",
  "Importante",
  "Muy importante",
];

const AGREEMENT_TEXTS = [
  "Me resulta fácil iniciar una conversación con personas que no conozco.",
  "Disfruto participar activamente en actividades grupales.",
  "Prefiero trabajar solo/a cuando necesito concentrarme profundamente.",
  "Después de pasar mucho tiempo con otras personas, necesito tiempo a solas para recuperar energía.",
  "Me gusta aprender sobre temas nuevos aunque no estén relacionados con mis estudios.",
  "Disfruto imaginar diferentes maneras de resolver un mismo problema.",
  "Me interesa descubrir cómo funcionan las cosas.",
  "Prefiero experimentar con nuevas ideas antes que seguir siempre una forma establecida de hacer las cosas.",
  "Suelo organizar mis actividades antes de comenzar un proyecto.",
  "Me esfuerzo por terminar lo que comienzo.",
  "Me cuesta mantener una rutina de trabajo cuando pierdo la motivación inicial.",
  "Antes de tomar una decisión, considero cómo puede afectar a otras personas.",
  "Puedo comprender un punto de vista diferente aunque no esté de acuerdo con él.",
  "Disfruto ayudar a otras personas a resolver problemas.",
  "Cuando tengo muchas responsabilidades al mismo tiempo, me cuesta mantener la concentración.",
  "Cuando algo sale mal, me cuesta recuperarme y continuar.",
  "Me gustaría trabajar utilizando herramientas, equipos, máquinas o tecnología física.",
  "Disfrutaría construir, reparar, ensamblar o modificar objetos.",
  "Prefiero aprender haciendo y experimentando antes que estudiando únicamente teoría.",
  "Disfruto analizar información para descubrir patrones o explicaciones.",
  "Me gustaría investigar las causas de problemas complejos.",
  "Disfruto resolver problemas que requieren razonamiento lógico.",
  "Me gustaría tener un trabajo donde pueda utilizar mi creatividad regularmente.",
  "Disfruto crear contenido, diseños, imágenes, videos, historias, música u otras formas de expresión.",
  "Me gusta desarrollar ideas originales aunque no exista una única respuesta correcta.",
  "Me gustaría enseñar o ayudar a otras personas a desarrollar sus capacidades.",
  "Me interesa comprender cómo piensan, sienten y se comportan las personas.",
  "Me gustaría que mi trabajo tuviera un impacto positivo directo en otras personas.",
  "Me gustaría dirigir proyectos o equipos.",
  "Disfruto convencer, negociar o presentar ideas ante otras personas.",
  "Me interesa crear un negocio, producto o proyecto propio.",
  "Me gusta organizar información de manera clara y estructurada.",
  "Disfruto trabajar con números, registros, documentos o bases de datos.",
  "Me resulta satisfactorio revisar información y encontrar errores.",
];

const SKILL_TEXTS = [
  "¿Qué tan bueno/a consideras que eres explicando ideas de manera clara a otras personas?",
  "¿Qué tan bueno/a consideras que eres analizando información y encontrando patrones o conclusiones?",
  "¿Qué tan bueno/a consideras que eres encontrando soluciones cuando no existe una respuesta evidente?",
  "¿Qué tan bueno/a consideras que eres generando ideas originales para resolver problemas o crear algo nuevo?",
  "¿Qué tan bueno/a consideras que eres aprendiendo y utilizando nuevas herramientas digitales?",
  "¿Qué tan bueno/a consideras que eres organizando proyectos, tareas y fechas límite?",
  "¿Qué tan bueno/a consideras que eres coordinando y motivando a otras personas para alcanzar un objetivo?",
  "¿Qué tan bueno/a consideras que eres aprendiendo rápidamente cuando tienes que enfrentar una situación nueva?",
];

const IMPORTANCE_TEXTS = [
  "¿Qué tan importante es para ti tener estabilidad económica en tu futura profesión?",
  "¿Qué tan importante es para ti tener libertad para tomar decisiones sobre tu trabajo?",
  "¿Qué tan importante es para ti tener oportunidades de crecimiento profesional?",
  "¿Qué tan importante es para ti poder utilizar tu creatividad y desarrollar ideas propias?",
];

export const QUESTIONS: Question[] = [
  ...AGREEMENT_TEXTS.map(
    (text, i): LikertQuestion => ({ id: i + 1, type: "likert", text, scaleLabels: AGREEMENT_SCALE })
  ),
  ...SKILL_TEXTS.map(
    (text, i): LikertQuestion => ({ id: 35 + i, type: "likert", text, scaleLabels: SKILL_SCALE })
  ),
  ...IMPORTANCE_TEXTS.map(
    (text, i): LikertQuestion => ({ id: 43 + i, type: "likert", text, scaleLabels: IMPORTANCE_SCALE })
  ),
  {
    id: 47,
    type: "multiple",
    text: "¿Qué tipo de actividad profesional te atrae más?",
    options: [
      "Trabajar principalmente con personas",
      "Trabajar con información y datos",
      "Trabajar con tecnología",
      "Creación de productos o contenido",
      "Una combinación de estas",
    ],
  },
  {
    id: 48,
    type: "multiple",
    text: "¿Qué entorno laboral preferirías?",
    options: [
      "Oficina",
      "Trabajo remoto",
      "Trabajo híbrido",
      "Trabajo práctico / de campo",
      "Una combinación de estas",
    ],
  },
  {
    id: 49,
    type: "multiple",
    text: "¿Cuál describe mejor tu principal objetivo profesional?",
    options: [
      "Conseguir un empleo estable",
      "Especializarte en un área",
      "Alcanzar puestos de liderazgo",
      "Crear tu propio negocio",
      "Trabajar por proyectos",
      "Todavía no lo sé",
    ],
  },
  {
    id: 50,
    type: "open",
    text: "Si pudieras elegir cualquier actividad profesional sin preocuparte inicialmente por el salario, ¿qué te gustaría hacer?",
    placeholder: "Escribe tu respuesta aquí...",
  },
];
