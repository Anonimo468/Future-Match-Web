"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isDisposableEmail } from "@/lib/disposableEmail";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.8055 10.2292C19.8055 9.55157 19.7501 8.86865 19.6323 8.19873H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.8252C18.7174 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
      <path d="M10.2002 20.0006C12.9524 20.0006 15.2723 19.1151 16.8298 17.5865L13.6071 15.0879C12.7095 15.6979 11.5521 16.0433 10.2047 16.0433C7.54529 16.0433 5.29267 14.2834 4.50529 11.9097H1.18433V14.4823C2.78267 17.6568 6.31267 20.0006 10.2002 20.0006Z" fill="#34A853"/>
      <path d="M4.50049 11.9097C4.07382 10.6678 4.07382 9.33367 4.50049 8.09177V5.51917H1.18432C-0.190765 8.23967 -0.190765 11.7615 1.18432 14.4823L4.50049 11.9097Z" fill="#FBBC04"/>
      <path d="M10.2002 3.95805C11.6255 3.93605 13.0025 4.47205 14.036 5.45805L16.8901 2.60405C15.1855 0.990047 12.9339 0.0950465 10.2002 0.122047C6.31267 0.122047 2.78267 2.46571 1.18433 5.64521L4.5005 8.21771C5.28333 5.83855 7.54055 3.95805 10.2002 3.95805Z" fill="#EA4335"/>
    </svg>
  );
}

export default function RegistroPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!acceptedTerms) {
      setError("Tenés que aceptar los términos y condiciones para continuar.");
      return;
    }

    if (isDisposableEmail(formData.email)) {
      setError("No aceptamos correos temporales o desechables. Usá un correo real (Gmail, Outlook, etc.).");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.fullName } },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    router.push("/cuestionario");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
    // Si no hay error, el navegador redirige a Google — no hace falta más acá.
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Columna izquierda — panel de marca */}
      <div
        className="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex"
        style={{ background: "linear-gradient(135deg,#5b21b6 0%,#7c3aed 55%,#a78bfa 100%)" }}
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-10 text-center">
          <div className="relative h-56 w-full max-w-[34rem]">
            <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain brightness-0 invert" sizes="544px" />
          </div>
          <h2 className="max-w-sm text-2xl font-bold text-white">
            Descubre tu camino. Decide tu futuro.
          </h2>
          <p className="max-w-sm text-sm font-light text-violet-100">
            Guardá tu progreso, volvé a ver tus recomendaciones cuando quieras, y chateá sin límites con Future Match.
          </p>
        </div>
      </div>

      {/* Columna derecha — formulario */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 sm:px-12">
        <div className="flex w-full max-w-md flex-col gap-7">
          <div className="flex justify-center lg:hidden">
            <div className="relative h-16 w-64">
              <Image src="/images/logo-future-match.webp" alt="Future Match" fill className="object-contain" sizes="256px" />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold text-[#1a1a3e]">Crea tu cuenta</h1>
            <p className="text-sm font-light text-gray-500">Guarda tu progreso y chatea sin límites</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            {googleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
            Continuar con Google
          </button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-light text-gray-400">o</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-sm text-gray-700">Nombre completo</label>
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ingresa tu nombre completo"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-gray-700">Correo electrónico</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@ejemplo.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Crea una contraseña segura"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-fm-purple focus:ring-fm-purple"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">Acepto los términos y condiciones</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Crear cuenta
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            ¿Ya tenés cuenta?{" "}
            <Link href="/iniciar-sesion" className="font-medium text-fm-purple hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
