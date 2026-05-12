import { useRef, useState, useCallback, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
  }, []);

  const onLeave = useCallback(() => setSpot((p) => ({ ...p, visible: false })), []);

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(260px circle at ${spot.x}px ${spot.y}px, rgba(var(--spotlight-rgb,59,130,246),.09), transparent 70%)`,
          opacity: spot.visible ? 1 : 0,
          transition: "opacity .35s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {children}
    </div>
  );
}
