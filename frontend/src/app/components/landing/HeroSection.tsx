import { Link } from "react-router";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection";
import { SystemStatusWidget } from "./SystemStatusWidget";

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      />
      <div
        className="absolute inset-x-0 h-[2px] opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)/.8) 50%, transparent 100%)",
          animation: "scanDown 8s linear infinite",
          top: 0,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 30%, hsl(var(--background)/.8) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64" style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }} />
    </div>
  );
}

const MINI_STATS = [
  { label: "Uptime", value: "99.97%" },
  { label: "Avg. Latency", value: "< 50ms" },
  { label: "Data Points / Day", value: "1.2M+" },
  { label: "Regions Covered", value: "34" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 px-6 overflow-hidden">
      <AnimatedGrid />

      <div
        className="absolute pointer-events-none"
        style={{
          top: "25%",
          left: "20%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--primary)/.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "floatOrb 18s ease-in-out infinite",
          zIndex: -1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(200 100% 60%/.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "floatOrb 22s ease-in-out infinite reverse",
          zIndex: -1,
        }}
      />

      <div className="max-w-5xl mx-auto w-full">
        <AnimatedSection delay={0}>
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-primary text-xs font-semibold mb-8"
            style={{
              background: "hsl(var(--primary)/.06)",
              border: "1px solid hsl(var(--primary)/.25)",
              animation: "borderGlow 3s ease-in-out infinite",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Live System · 247 Stations Online
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <h1 className="heading-font text-7xl sm:text-6xl lg:text-[76px] font-extrabold leading-[1.04] tracking-tight mb-6">
            Industrial SCADA
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">Monitoring Platform</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={160}>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            Real-time geospatial monitoring, intelligent alerting, and predictive analytics for critical infrastructure across Indonesia — built for engineers who demand precision.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={240}>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/dashboard" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:opacity-95 hover:scale-105 transition-all">
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="#map" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm" style={{ borderColor: "hsl(var(--border)/.7)" }}>
              <MapPin className="w-4 h-4 text-primary" />
              View Live Map
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={320}>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {MINI_STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <SystemStatusWidget />
    </section>
  );
}
