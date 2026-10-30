import type { User } from "@supabase/supabase-js";

export function getUserName(user: User): string {
  return (
    (user.user_metadata?.display_name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email ||
    ""
  );
}

export function getUserAvatarUrl(user: User): string | null {
  return (
    (user.user_metadata?.custom_avatar_url as string | undefined) ||
    (user.user_metadata?.avatar_url as string | undefined) ||
    null
  );
}
