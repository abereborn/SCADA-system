import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  style?: CSSProperties;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  style,
}: AnimatedSectionProps) {
  const { ref, inView } = useInView();
  const initial: Record<string, string> = {
    up: "translateY(48px)",
    left: "translateX(-48px)",
    right: "translateX(48px)",
    fade: "translateY(0px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : initial[direction],
        transition: `opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
