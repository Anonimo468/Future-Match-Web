"use client";

import { useState } from "react";

interface Props {
  src?: string | null;
  name?: string | null;
  className?: string;
  textClassName?: string;
}

export default function Avatar({
  src,
  name,
  className = "h-9 w-9",
  textClassName = "text-xs",
}: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const initial = name?.trim().charAt(0).toUpperCase() || "?";

  if (!src || failedSrc === src) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${className} ${textClassName}`}
        style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)" }}
        aria-label={name ? `Avatar de ${name}` : "Avatar"}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      ref={(node) => {
        if (node?.complete && node.naturalWidth === 0) setFailedSrc(src);
      }}
      src={src}
      alt={name ? `Foto de ${name}` : "Foto de perfil"}
      className={`shrink-0 rounded-full object-cover ${className}`}
      referrerPolicy="no-referrer"
      onError={() => setFailedSrc(src)}
    />
  );
}
