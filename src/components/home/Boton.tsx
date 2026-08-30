"use client";

interface BotonProps {
  children: React.ReactNode;
  variant?: "filled" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const gBtn: React.CSSProperties = {
  background: "linear-gradient(135deg,#5b21b6,#7c3aed)",
};

export default function Boton({ children, variant = "filled", href, onClick, className = "" }: BotonProps) {
  const baseCls =
    "inline-block text-center font-semibold py-3 px-8 rounded-full text-sm transition-transform hover:scale-105";
  const filledCls = "text-white shadow-lg shadow-violet-700/30";
  const outlineCls = "border-2 border-violet-700 text-violet-700 hover:bg-violet-50";

  const cls = `${baseCls} ${variant === "filled" ? filledCls : outlineCls} ${className}`;
  const style = variant === "filled" ? gBtn : undefined;

  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}
