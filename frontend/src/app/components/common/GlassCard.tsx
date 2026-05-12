import type { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", style, onClick }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        backdropFilter: "blur(20px)",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
