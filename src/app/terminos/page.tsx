import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Términos y condiciones — Future Match",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <div className="h-[130px]" />

      <article className="px-6 py-12">
        <div className="mx-auto max-w-[780px]">
          <h1 className="mb-2 text-2xl font-bold text-[#1a1a3e] md:text-3xl">Términos y condiciones</h1>
          <p className="mb-10 text-sm font-light text-gray-400">Última actualización: septiembre de 2026</p>

          <div className="flex flex-col gap-8 text-sm font-light leading-relaxed text-gray-700 [&_h2]:mb-3 [&_h2]:mt-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#1a1a3e] [&_p]:mb-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5">
            <section>
              <h2>1. Aceptación de los términos</h2>
              <p>
                Al crear una cuenta, usar el modo invitado o de cualquier otra forma acceder a Future Match
                (el &quot;Servicio&quot;), aceptás estos Términos y Condiciones y nuestra{" "}
                <Link href="/privacidad" className="text-fm-purple hover:underline">Política de Privacidad</Link>.
                Si no estás de acuerdo, no deberías usar el Servicio.
              </p>
            </section>

            <section>
              <h2>2. Qué es Future Match</h2>
              <p>
                Future Match es una plataforma que utiliza inteligencia artificial para ofrecer orientación
                vocacional: a partir de un cuestionario, generamos un análisis de perfil y recomendaciones de
                carreras, universidades y oportunidades que pueden ser de tu interés, y ofrecemos un chat para
                seguir conversando sobre tu resultado.
              </p>
              <p>
                <strong>Las recomendaciones son generadas por un modelo de IA y tienen fines orientativos.</strong>{" "}
                No reemplazan el consejo de un orientador vocacional profesional, psicólogo, ni ninguna decisión
                académica o profesional debe tomarse basándose únicamente en ellas.
              </p>
            </section>

            <section>
              <h2>3. Uso por menores de edad</h2>
              <p>
                Future Match está pensado principalmente para estudiantes de bachillerato, muchos de los cuales
                pueden ser menores de edad. Si sos menor de edad, entendemos que usás el Servicio en el marco de
                una actividad institucional (por ejemplo, un taller escolar) con el conocimiento de tu institución
                educativa, y recomendamos el acompañamiento de un adulto responsable al crear una cuenta con
                correo y contraseña propios.
              </p>
            </section>

            <section>
              <h2>4. Cuentas y modo invitado</h2>
              <ul>
                <li>Sos responsable de mantener la confidencialidad de tu contraseña y de toda actividad en tu cuenta.</li>
                <li>Los datos que ingreses (nombre, correo, respuestas del cuestionario) deben ser reales y propios.</li>
                <li>No se permite registrarse con correos electrónicos temporales o desechables.</li>
                <li>
                  El modo invitado permite probar el Servicio sin crear cuenta, con límites de uso (por ejemplo,
                  cantidad de chats gratuitos) y sin garantía de que el progreso se conserve entre sesiones.
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Uso aceptable</h2>
              <p>No está permitido:</p>
              <ul>
                <li>Usar el Servicio para fines ilegales, fraudulentos o para hostigar a otras personas.</li>
                <li>Intentar acceder a cuentas, datos o sistemas que no te pertenecen.</li>
                <li>Interferir con el funcionamiento del Servicio (por ejemplo, con ataques automatizados o de sobrecarga).</li>
                <li>Copiar, revender o redistribuir el Servicio o su contenido sin autorización.</li>
              </ul>
            </section>

            <section>
              <h2>6. Límites del servicio gratuito</h2>
              <p>
                Algunas funciones (como la cantidad de chats de seguimiento) tienen límites de uso gratuito.
                Podemos modificar esos límites en cualquier momento.
              </p>
            </section>

            <section>
              <h2>7. Disponibilidad del servicio</h2>
              <p>
                Hacemos lo posible por mantener el Servicio disponible, pero puede haber interrupciones por
                mantenimiento, fallas técnicas o causas fuera de nuestro control. No garantizamos disponibilidad
                ininterrumpida.
              </p>
            </section>

            <section>
              <h2>8. Propiedad intelectual</h2>
              <p>
                La marca, el diseño, los textos y el software de Future Match nos pertenecen o están licenciados
                a nosotros. Las respuestas y contenido que generás al usar el Servicio (tus respuestas al
                cuestionario, tus mensajes de chat) siguen siendo tuyos; nos das permiso para procesarlos con el
                único fin de brindarte el Servicio.
              </p>
            </section>

            <section>
              <h2>9. Limitación de responsabilidad</h2>
              <p>
                El Servicio se ofrece &quot;tal cual&quot;. En la medida permitida por la ley, Future Match no
                será responsable por decisiones académicas, profesionales o personales que tomes basándote en las
                recomendaciones generadas por la plataforma.
              </p>
            </section>

            <section>
              <h2>10. Cambios a estos términos</h2>
              <p>
                Podemos actualizar estos Términos ocasionalmente. Si hacemos cambios importantes, lo indicaremos
                en esta misma página actualizando la fecha de &quot;Última actualización&quot;.
              </p>
            </section>

            <section>
              <h2>11. Contacto</h2>
              <p>
                Ante cualquier duda sobre estos Términos, escribinos a{" "}
                <a href="mailto:info@futurematch.com" className="text-fm-purple hover:underline">info@futurematch.com</a>.
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
