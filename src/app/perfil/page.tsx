"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Loader2, MessageCircle, Save } from "lucide-react";
import QuizHeader from "@/components/quiz/QuizHeader";
import { createClient } from "@/lib/supabase/client";

function displayName(user: User) {
  return (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "";
}

function avatarUrl(user: User) {
  return user.user_metadata?.avatar_url as string | undefined;
}

export default function PerfilPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      if (!sessionUser) {
        router.push("/iniciar-sesion?next=/perfil");
        return;
      }
      setUser(sessionUser);
      setFullName((sessionUser.user_metadata?.full_name as string | undefined) ?? "");
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    const { data, error: updateError } = await supabase.auth.updateUser({
      data: { full_name: fullName.trim() },
    });

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    if (data.user) setUser(data.user);
    setSaved(true);
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <QuizHeader />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-violet-700" />
        </div>
      </div>
    );
  }

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <QuizHeader />

      <div className="flex-1 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-lg"
        >
          <h1 className="mb-8 text-2xl font-bold text-[#1a1a3e]">Mi perfil</h1>

          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              {avatarUrl(user) ? (
                <img
                  src={avatarUrl(user)}
                  alt={displayName(user)}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
                >
                  {displayName(user).charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <div>
                <p className="text-base font-semibold text-[#1a1a3e]">{displayName(user)}</p>
                <p className="text-sm font-light text-gray-500">{user.email}</p>
                {memberSince && (
                  <p className="mt-0.5 text-xs font-light text-gray-400">Miembro desde el {memberSince}</p>
                )}
              </div>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-sm text-gray-700">Nombre completo</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-colors focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Correo electrónico</label>
                <input
                  type="email"
                  value={user.email ?? ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {saved && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  Cambios guardados.
                </div>
              )}

              <button
                type="submit"
                disabled={saving || !fullName.trim()}
                className="flex items-center justify-center gap-2 self-start rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Guardar cambios
              </button>
            </form>
          </div>

          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-violet-200 hover:text-violet-700"
          >
            <MessageCircle className="h-4 w-4" />
            Ver mis chats
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
