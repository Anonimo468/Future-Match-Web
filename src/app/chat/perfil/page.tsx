"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Loader2, Save } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import Avatar from "@/components/Avatar";
import { createClient } from "@/lib/supabase/client";
import { getUserAvatarUrl, getUserName } from "@/lib/user";

export default function PerfilPage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      if (!sessionUser) {
        router.replace("/iniciar-sesion?next=/chat/perfil");
        return;
      }
      setUser(sessionUser);
      setAvatarUrl(getUserAvatarUrl(sessionUser));
      setFullName(
        (sessionUser.user_metadata?.display_name as string | undefined) ??
          (sessionUser.user_metadata?.full_name as string | undefined) ??
          ""
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user) return;

    setError(null);
    setSuccess(null);

    if (!file.type.startsWith("image/")) {
      setError("El archivo tiene que ser una imagen.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede pesar más de 5 MB.");
      return;
    }

    setUploading(true);

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setUploading(false);
      setError("No se pudo subir la imagen. Intentá de nuevo.");
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = publicUrlData.publicUrl;

    const { data, error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl, custom_avatar_url: publicUrl },
    });

    setUploading(false);

    if (updateError) {
      setError("No se pudo actualizar tu perfil. Intentá de nuevo.");
      return;
    }

    if (data.user) setUser(data.user);
    setAvatarUrl(publicUrl);
    setSuccess("Foto de perfil actualizada.");
  }

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    const name = fullName.trim();
    if (!name) {
      setError("El nombre no puede estar vacío.");
      return;
    }

    setError(null);
    setSuccess(null);
    setSavingName(true);

    const { data, error: updateError } = await supabase.auth.updateUser({
      data: { full_name: name, display_name: name },
    });

    setSavingName(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    if (data.user) setUser(data.user);
    setSuccess("Nombre actualizado.");
  }

  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-fm-purple" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50 px-6 py-10">
      <div className="mx-auto w-full max-w-md">
        <button
          onClick={() => router.push("/chat")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-fm-purple"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al chat
        </button>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-xl font-bold text-[#1a1a3e]">Mi perfil</h1>

          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar
                src={avatarUrl}
                name={getUserName(user)}
                className="h-24 w-24"
                textClassName="text-2xl"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                aria-label="Cambiar foto de perfil"
                className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-fm-purple text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-sm font-medium text-fm-purple hover:underline disabled:opacity-60"
            >
              Cambiar foto
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-center text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-center text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSaveName} className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="chatFullName" className="text-sm text-gray-700">
                Nombre completo
              </label>
              <input
                id="chatFullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={80}
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

            <button
              type="submit"
              disabled={savingName || !fullName.trim()}
              className="flex items-center justify-center gap-2 self-start rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
            >
              {savingName ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Guardar nombre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
