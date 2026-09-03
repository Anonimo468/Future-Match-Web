export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: { heading?: string; paragraphs: string[] }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-la-ia-puede-ayudarte-a-elegir-tu-carrera",
    title: "Cómo la IA puede ayudarte a elegir tu carrera",
    date: "24 jul",
    readTime: "3 min de lectura",
    image: "/images/blog-1.webp",
    excerpt:
      "Elegir qué estudiar es una de las decisiones más grandes que vas a tomar, y muchas veces la tomamos con más dudas que información real.",
    content: [
      {
        paragraphs: [
          "Elegir qué estudiar es una de esas decisiones que pesan. No es solo \"qué me gusta\", es también \"qué se me da bien\", \"qué opciones hay realmente donde vivo\" y \"qué tan probable es que termine haciendo eso\". La mayoría de veces tomamos esa decisión con más dudas que información clara.",
          "Ahí es donde entra la inteligencia artificial, no como una bola de cristal que te dice tu destino, sino como una herramienta que te ayuda a ver patrones en vos mismo que quizás no habías notado.",
        ],
      },
      {
        heading: "¿Qué mira exactamente la IA?",
        paragraphs: [
          "En Future Match, todo arranca con un cuestionario de 50 preguntas. No son preguntas al azar: están pensadas para ir sacando a la luz tus intereses, tus habilidades, y hasta cosas más sutiles como si preferís trabajar en equipo o solo, si te gusta la rutina o lo impredecible.",
          "Una vez que respondés, un modelo de IA analiza esas respuestas en conjunto (no pregunta por pregunta, sino buscando el patrón general) y arma un perfil vocacional. Después, ese perfil se compara con carreras y oportunidades reales, priorizando siempre opciones acá en El Salvador.",
        ],
      },
      {
        heading: "Lo que la IA no hace (y está bien que no lo haga)",
        paragraphs: [
          "Ninguna herramienta, por más avanzada que sea, va a decirte con 100% de certeza \"esto es lo tuyo\". Lo que sí puede hacer es darte un punto de partida más ordenado: opciones concretas, explicadas, para que vos decidas con más información en la mano en vez de tirar una moneda.",
          "La decisión final siempre es tuya. La IA acomoda el panorama, pero quien elige el camino sos vos.",
        ],
      },
      {
        heading: "¿Cómo lo hacemos en Future Match?",
        paragraphs: [
          "Después de que completás el test, no te quedás solo con una lista fría. Podés seguir conversando para entender mejor por qué te recomendamos ciertas opciones, preguntar sobre universidades específicas, o simplemente pensar en voz alta con alguien (bueno, con algo) que tiene el contexto completo de tu perfil.",
          "Si todavía no hiciste el test, es un buen momento para probarlo.",
        ],
      },
    ],
  },
  {
    slug: "impulsa-tu-futuro-con-future-match",
    title: "Impulsa tu futuro con Future Match",
    date: "22 jul",
    readTime: "4 min de lectura",
    image: "/images/blog-2.webp",
    excerpt:
      "No hace falta tener todo claro para empezar a explorar. Te contamos cómo sacarle el máximo provecho al test vocacional.",
    content: [
      {
        paragraphs: [
          "Si estás en bachillerato (o ya casi terminando) y todavía no tenés claro qué vas a estudiar, tranquilo: es más común de lo que parece. La presión de \"tener que saber\" a veces complica más las cosas de lo que ayuda.",
          "Future Match nació justo para eso: darte un espacio donde explorar sin la presión de acertar a la primera.",
        ],
      },
      {
        heading: "El test no es un examen, es una conversación con vos mismo",
        paragraphs: [
          "Las 50 preguntas del test cubren de todo: cómo te llevás con otras personas, qué tipo de problemas disfrutás resolver, qué tan importante es para vos la estabilidad económica versus la libertad de crear algo propio. No hay respuestas correctas o incorrectas, solo las tuyas.",
          "Al terminar, no recibís una única respuesta tipo \"deberías ser ingeniero\". Recibís varias opciones, explicadas, para que las compares entre sí y veas cuál te representa mejor.",
        ],
      },
      {
        heading: "Después del test, seguís teniendo con quién hablar",
        paragraphs: [
          "Una de las partes que más nos gusta de Future Match es que la conversación no termina cuando cierra el resultado. Podés seguir preguntando: sobre una carrera puntual, sobre qué universidades la ofrecen en El Salvador, sobre qué se estudia realmente en esa carrera más allá del nombre.",
          "Es como tener a alguien con quien pensar en voz alta tu futuro, disponible cuando lo necesites.",
        ],
      },
      {
        heading: "Un consejo antes de empezar",
        paragraphs: [
          "Respondé el test con honestidad, no con lo que creés que \"deberías\" responder. Cuanto más real sea tu respuesta, más útil va a ser lo que te devolvamos. No hay forma de hacerlo mal.",
        ],
      },
    ],
  },
  {
    slug: "como-future-match-te-conecta-con-tu-vocacion",
    title: "Cómo Future Match te conecta con tu vocación",
    date: "22 jul",
    readTime: "3 min de lectura",
    image: "/images/blog-3.webp",
    excerpt:
      "Encontrar tu vocación no siempre es un momento de claridad instantánea. A veces es más bien ir conectando puntos.",
    content: [
      {
        paragraphs: [
          "Se habla mucho de \"encontrar tu vocación\" como si fuera un momento único, una epifanía. En la práctica, para la mayoría de la gente es más bien ir conectando puntos poco a poco: un interés acá, una habilidad allá, hasta que el panorama se empieza a aclarar.",
          "Future Match está pensado para ayudarte a conectar esos puntos más rápido, con datos reales en vez de solo intuición.",
        ],
      },
      {
        heading: "De respuestas sueltas a un perfil completo",
        paragraphs: [
          "Cada respuesta del test, por separado, dice poco. Pero cuando la IA las mira todas juntas, empiezan a aparecer patrones: quizás resulta que te gusta tanto ayudar a otros como resolver problemas técnicos, y eso abre la puerta a carreras que combinan ambas cosas y que quizás no habías considerado.",
          "Ese es justamente el valor de analizar el conjunto completo en vez de una sola respuesta aislada.",
        ],
      },
      {
        heading: "Opciones reales, no genéricas",
        paragraphs: [
          "Cuando te damos una recomendación, tratamos de que sea concreta: universidades específicas en El Salvador, áreas de estudio reales, no una lista genérica que le serviría a cualquiera. Priorizamos siempre opciones locales, porque sabemos que es donde probablemente vas a estudiar.",
          "Y como todo puede cambiar (programas, requisitos, oferta académica), siempre te vamos a recomendar confirmar los detalles finales directo con la universidad antes de decidir.",
        ],
      },
      {
        heading: "El siguiente paso es tuyo",
        paragraphs: [
          "Future Match te ayuda a ordenar el panorama y a conectar los puntos. Pero el paso de investigar más a fondo, visitar una universidad, hablar con alguien que ya estudia esa carrera, eso lo das vos. Nosotros solo tratamos de que llegues a ese paso con más claridad que con la que empezaste.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
