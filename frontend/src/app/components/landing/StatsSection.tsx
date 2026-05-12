import { Radio, Globe, Database, Server } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { ScanLine } from "../common/ScanLine";
import { SpotlightCard } from "../common/SpotlightCard";

function CountUp({ end, suffix = "", duration = 2200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = Date.now();
          const tick = () => {
            const p = Math.min((Date.now() - t0) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <SpotlightCard className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm hover:border-primary/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 cursor-default">
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-bl-[90px] group-hover:from-primary/20 transition-all duration-500" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300">
          <Icon className="text-primary w-4 h-4" />
        </div>
        <p className="text-4xl font-extrabold tracking-tight tabular-nums bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          <CountUp end={value} suffix={suffix ?? ""} />
        </p>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1.5">{label}</p>
      </div>
    </SpotlightCard>
  );
}

const STATS = [
  { value: 247, label: "Active Stations", icon: Radio },
  { value: 34, label: "Provinces Monitored", icon: Globe },
  { value: 1200000, suffix: "+", label: "Data Points / Day", icon: Database },
  { value: 99, suffix: ".97%", label: "Platform Uptime", icon: Server },
];

export function StatsSection() {
  return (
    <section className="py-20 px-6 ab-bg-color relative overflow-hidden">
      <ScanLine className="absolute top-0 inset-x-0" />
      <ScanLine className="absolute bottom-0 inset-x-0" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 80} direction="up">
              <StatCard value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
