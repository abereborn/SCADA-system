import { useState, useRef, useCallback, useEffect } from "react";
import { Server, X } from "lucide-react";

const STATUSES = [
  { name: "Data Ingestion", status: "Normal", color: "emerald" },
  { name: "Alert Engine", status: "Active", color: "emerald" },
  { name: "Weather Radar", status: "Syncing", color: "amber" },
  { name: "API Gateway", status: "Normal", color: "emerald" },
  { name: "Backup Node", status: "Standby", color: "blue" },
];

const DOT_COLORS: Record<string, string> = {
  emerald: "#10b981",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

export function SystemStatusWidget() {
  const [isOpen, setIsOpen] = useState(true);

  const posRef = useRef({ x: 0, y: 0 });
  const [displayPos, setDisplayPos] = useState({ x: 0, y: 0 });
  const applyPos = useCallback((p: { x: number; y: number }) => {
    posRef.current = p;
    setDisplayPos(p);
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0, t: 0 });
  const inertiaRaf = useRef<number | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const floatRaf = useRef<number | null>(null);
  const [floatY, setFloatY] = useState(0);

  const startFloat = useCallback(() => {
    const tick = (ts: number) => {
      setFloatY(Math.sin(ts / 1600) * 3.5);
      floatRaf.current = requestAnimationFrame(tick);
    };
    floatRaf.current = requestAnimationFrame(tick);
  }, []);

  const stopFloat = useCallback(() => {
    if (floatRaf.current) cancelAnimationFrame(floatRaf.current);
    setFloatY(0);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const defaultPos = {
        x: Math.max(40, window.innerWidth * 0.7),
        y: Math.max(120, window.innerHeight * 0.3),
      };

      applyPos(constrain(defaultPos.x, defaultPos.y));
    }

    startFloat();

    return () => {
      if (floatRaf.current) cancelAnimationFrame(floatRaf.current);
    };
  }, []);

  const savePos = useCallback((p: { x: number; y: number }) => {
    localStorage.setItem("systemStatusPosition", JSON.stringify(p));
  }, []);

  const constrain = useCallback((x: number, y: number) => {
    const w = widgetRef.current?.offsetWidth ?? 288;
    const h = widgetRef.current?.offsetHeight ?? 380;
    return {
      x: Math.max(16, Math.min(x, window.innerWidth - w - 16)),
      y: Math.max(16, Math.min(y, window.innerHeight - h - 16)),
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      stopFloat();
      if (inertiaRaf.current) cancelAnimationFrame(inertiaRaf.current);
      setIsDragging(true);
      const rect = widgetRef.current!.getBoundingClientRect();
      dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      lastMouse.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      velocityRef.current = { x: 0, y: 0 };
    },
    [stopFloat],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const now = Date.now();
      const dt = Math.max(now - lastMouse.current.t, 1);
      velocityRef.current = {
        x: ((e.clientX - lastMouse.current.x) / dt) * 14,
        y: ((e.clientY - lastMouse.current.y) / dt) * 14,
      };
      lastMouse.current = { x: e.clientX, y: e.clientY, t: now };
      applyPos(constrain(e.clientX - dragOffsetRef.current.x, e.clientY - dragOffsetRef.current.y));
    },
    [isDragging, applyPos, constrain],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    let vx = velocityRef.current.x;
    let vy = velocityRef.current.y;
    const FRICTION = 0.88;
    const tick = () => {
      vx *= FRICTION;
      vy *= FRICTION;
      if (Math.abs(vx) < 0.15 && Math.abs(vy) < 0.15) {
        savePos(posRef.current);
        startFloat();
        return;
      }
      const next = constrain(posRef.current.x + vx, posRef.current.y + vy);
      applyPos(next);
      inertiaRaf.current = requestAnimationFrame(tick);
    };
    inertiaRaf.current = requestAnimationFrame(tick);
  }, [isDragging, savePos, constrain, applyPos, startFloat]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      stopFloat();
      if (inertiaRaf.current) cancelAnimationFrame(inertiaRaf.current);
      setIsDragging(true);
      const t = e.touches[0];
      const rect = widgetRef.current!.getBoundingClientRect();
      dragOffsetRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top };
      lastMouse.current = { x: t.clientX, y: t.clientY, t: Date.now() };
      velocityRef.current = { x: 0, y: 0 };
    },
    [stopFloat],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const tc = e.touches[0];
      const now = Date.now();
      const dt = Math.max(now - lastMouse.current.t, 1);
      velocityRef.current = {
        x: ((tc.clientX - lastMouse.current.x) / dt) * 14,
        y: ((tc.clientY - lastMouse.current.y) / dt) * 14,
      };
      lastMouse.current = { x: tc.clientX, y: tc.clientY, t: now };
      applyPos(constrain(tc.clientX - dragOffsetRef.current.x, tc.clientY - dragOffsetRef.current.y));
    },
    [isDragging, applyPos, constrain],
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          startFloat();
        }}
        className="fixed bottom-8 right-8 lg:flex hidden w-14 h-14 rounded-2xl bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-xl border border-primary/50 shadow-2xl hover:shadow-primary/30 hover:scale-110 transition-all duration-300 items-center justify-center z-50"
        title="Open System Status"
      >
        <div className="relative flex items-center justify-center">
          <Server className="w-5 h-5 relative z-10" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-background animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
        </div>
        <div className="absolute inset-0 rounded-2xl border border-primary/40 animate-ping opacity-30" />
      </button>
    );
  }

  return (
    <div
      ref={widgetRef}
      className="fixed lg:block hidden z-50"
      style={{
        left: `${displayPos.x}px`,
        top: `${displayPos.y}px`,
        transform: isDragging ? "translateY(0px) scale(1.02)" : `translateY(${floatY}px) scale(1)`,
        transition: isDragging ? "transform .1s ease" : "transform .6s cubic-bezier(.34,1.56,.64,1)",
        willChange: "transform, left, top",
      }}
    >
      <div
        className="ab-system-widget relative w-72 rounded-3xl overflow-hidden transition-all duration-300"
        style={{
          boxShadow: isDragging
            ? "0 32px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(var(--primary-rgb,99,102,241),.4), inset 0 1px 0 rgba(255,255,255,.06)"
            : "0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(var(--primary-rgb,99,102,241),.15), inset 0 1px 0 rgba(255,255,255,.05)",
          transition: "box-shadow .4s ease",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary)/.7) 40%, hsl(200 100% 60%/.7) 60%, transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 20% 0%, hsl(var(--primary)/.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, hsl(200 100% 60%/.05) 0%, transparent 60%)",
          }}
        />

        <div
          className={`absolute -top-1 left-1/2 -translate-x-1/2 flex items-center justify-center w-11 h-11 rounded-full text-black dark:text-white z-20 transition-all duration-200 ${
            isDragging ? "scale-110 cursor-grabbing" : "cursor-grab hover:scale-105"
          }`}
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/.8))",
            boxShadow: isDragging ? "0 8px 32px hsl(var(--primary)/.6), 0 0 0 4px hsl(var(--primary)/.15)" : "0 4px 16px hsl(var(--primary)/.4)",
            transition: "all .25s cubic-bezier(.34,1.56,.64,1)",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute" />
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </div>

        <button
          onClick={() => {
            setIsOpen(false);
            stopFloat();
          }}
          className="absolute top-3 right-3 w-7 h-7 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground z-20 transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="relative pt-12 pb-5 px-5 z-10">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">System Status</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">All Operational</span>
          </div>

          {STATUSES.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0 relative z-10">
              <span className="text-sm text-muted-foreground font-medium">{s.name}</span>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full shadow-sm ${s.status === "Syncing" ? "animate-pulse" : ""}`} style={{ background: DOT_COLORS[s.color] }} />
                <span className="text-xs font-semibold text-foreground">{s.status}</span>
              </div>
            </div>
          ))}

          <div className="mt-5 pt-4 border-t border-border/30 relative z-10">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Processing Load</span>
              <span>63%</span>
            </div>
            <div className="h-2 rounded-full bg-border/50 overflow-hidden shadow-inner">
              <div className="h-full w-[63%] bg-gradient-to-r from-primary via-cyan-400 to-blue-500 rounded-full shadow-md animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
