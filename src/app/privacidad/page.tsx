import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Política de privacidad — Future Match",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <div className="h-[130px]" />

      <article className="px-6 py-12">
        <div className="mx-auto max-w-[780px]">
          <h1 className="mb-2 text-2xl font-bold text-[#1a1a3e] md:text-3xl">Política de privacidad</h1>
          <p className="mb-10 text-sm font-light text-gray-400">Última actualización: septiembre de 2026</p>

          <div className="flex flex-col gap-8 text-sm font-light leading-relaxed text-gray-700 [&_h2]:mb-3 [&_h2]:mt-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#1a1a3e] [&_p]:mb-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5">
            <section>
              <h2>1. Qué datos recopilamos</h2>
              <p>Recopilamos los siguientes datos cuando usás Future Match:</p>
              <ul>
                <li><strong>Datos de cuenta:</strong> nombre completo, correo electrónico y, si te registrás con Google, tu nombre y foto de perfil públicos de Google.</li>
                <li><strong>Respuestas del cuestionario vocacional:</strong> tus respuestas a las preguntas, usadas para generar tu perfil y recomendaciones.</li>
                <li><strong>Mensajes de chat:</strong> las conversaciones que tenés con el asistente de orientación.</li>
                <li><strong>Datos técnicos básicos:</strong> información de uso necesaria para el funcionamiento del servicio (por ejemplo, identificadores de sesión para el modo invitado).</li>
              </ul>
              <p>No pedimos ni almacenamos datos de pago, ya que el Servicio no procesa cobros.</p>
            </section>

            <section>
              <h2>2. Para qué usamos tus datos</h2>
              <ul>
                <li>Generar tu análisis de perfil y las recomendaciones vocacionales.</li>
                <li>Permitirte retomar tu progreso y ver tu historial de chats.</li>
                <li>Mantener tu cuenta segura (por ejemplo, bloqueando registros con correos temporales).</li>
                <li>Mejorar el funcionamiento del Servicio.</li>
              </ul>
              <p>No vendemos tus datos personales a terceros.</p>
            </section>

            <section>
              <h2>3. Con quién compartimos datos</h2>
              <p>
                Para poder ofrecer el Servicio, algunos datos se procesan a través de proveedores externos que
                actúan en nuestro nombre:
              </p>
              <ul>
                <li><strong>Supabase</strong> — autenticación y base de datos donde se guardan tu cuenta, respuestas y mensajes.</li>
                <li><strong>OpenRouter (y los modelos de IA que enruta, incluyendo búsqueda web vía Exa)</strong> — procesa tus respuestas del cuestionario y tus mensajes de chat para generar las recomendaciones y respuestas conversacionales.</li>
                <li><strong>Google</strong> — si elegís iniciar sesión con Google, para la autenticación.</li>
                <li><strong>Vercel y Railway</strong> — alojan la aplicación web y el servidor.</li>
              </ul>
              <p>
                Estos proveedores solo acceden a los datos necesarios para cumplir su función y están sujetos a sus
                propias políticas de privacidad y seguridad.
              </p>
            </section>

            <section>
              <h2>4. Menores de edad</h2>
              <p>
                Sabemos que muchos usuarios de Future Match son estudiantes de bachillerato, posiblemente menores
                de edad, que participan en el marco de actividades escolares. No recopilamos intencionalmente más
                datos de los necesarios para el Servicio (nombre, correo, respuestas del cuestionario y mensajes
                de chat), y recomendamos a las instituciones educativas informar a los estudiantes y, cuando
                corresponda, a sus responsables, sobre el uso de la plataforma.
              </p>
            </section>

            <section>
              <h2>5. Dónde y cuánto tiempo guardamos tus datos</h2>
              <p>
                Tus datos se almacenan en la base de datos de Supabase asociada a tu cuenta mientras la cuenta
                exista. Si usás el <strong>modo invitado</strong>, tu chat de prueba se elimina automáticamente a
                las 24 horas. El progreso del cuestionario en curso (mientras lo estás respondiendo) se guarda
                localmente en tu navegador para que no se pierda si hay un corte de conexión, y se borra
                automáticamente al completarlo o luego de 48 horas.
              </p>
            </section>

            <section>
              <h2>6. Tus derechos</h2>
              <p>Podés en cualquier momento:</p>
              <ul>
                <li>Ver y editar tu nombre desde tu <a href="/perfil" className="text-fm-purple hover:underline">perfil</a>.</li>
                <li>Pedirnos una copia de los datos asociados a tu cuenta.</li>
                <li>Pedirnos que eliminemos tu cuenta y los datos asociados.</li>
              </ul>
              <p>
                Para ejercer estos derechos, escribinos a{" "}
                <a href="mailto:info@futurematch.com" className="text-fm-purple hover:underline">info@futurematch.com</a>.
              </p>
            </section>

            <section>
              <h2>7. Cookies y almacenamiento local</h2>
              <p>
                Usamos almacenamiento local del navegador (localStorage) para mantener tu sesión iniciada,
                identificar tu chat de invitado y guardar el progreso del cuestionario mientras lo respondés. No
                usamos cookies de publicidad ni de rastreo de terceros.
              </p>
            </section>

            <section>
              <h2>8. Seguridad</h2>
              <p>
                Tu contraseña se almacena de forma cifrada por Supabase Auth y nunca la vemos en texto plano. Las
                comunicaciones con el Servicio viajan cifradas (HTTPS).
              </p>
            </section>

            <section>
              <h2>9. Cambios a esta política</h2>
              <p>
                Si hacemos cambios importantes a esta política, actualizaremos la fecha de &quot;Última
                actualización&quot; al principio de esta página.
              </p>
            </section>

            <section>
              <h2>10. Contacto</h2>
              <p>
                Ante cualquier duda sobre esta Política de Privacidad, escribinos a{" "}
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
