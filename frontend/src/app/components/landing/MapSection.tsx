import { Radio, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection";
import { SectionTitle } from "../common/SectionTitle";
import { WeatherMap } from "../WeatherMap";

const MAP_BADGES = [
  { icon: Radio, label: "247 Active Stations", colorClass: "emerald" },
  { icon: AlertTriangle, label: "3 Active Alerts", colorClass: "amber" },
  { icon: CheckCircle2, label: "All Systems Normal", colorClass: "blue" },
];

const COLOR_MAP: Record<string, { bg: string; border: string; icon: string }> = {
  emerald: {
    bg: "rgba(166,243,208,.06)",
    border: "rgba(16,185,129,.2)",
    icon: "text-emerald-500",
  },
  amber: {
    bg: "rgba(253,230,138,.06)",
    border: "rgba(245,158,11,.2)",
    icon: "text-amber-500",
  },
  blue: {
    bg: "rgba(191,219,254,.06)",
    border: "rgba(59,130,246,.2)",
    icon: "text-blue-500",
  },
};

export function MapSection() {
  return (
    <section id="map" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Live Coverage"
          title="Indonesia Weather Radar"
          subtitle="Real-time radar imagery integrated directly with station monitoring data across all 34 provinces."
          className="mb-12"
        />

        <AnimatedSection direction="fade" delay={80}>
          <div className="flex flex-wrap gap-3 justify-center mb-7">
            {MAP_BADGES.map(({ icon: Icon, label, colorClass }) => {
              const c = COLOR_MAP[colorClass];
              return (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border"
                  style={{ background: c.bg, borderColor: c.border }}
                >
                  <Icon className={`w-4 h-4 ${c.icon}`} />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={100}>
          <div
            className="rounded-2xl overflow-hidden border shadow-2xl"
            style={{
              borderColor: "hsl(var(--border)/.6)",
              boxShadow: "0 24px 80px rgba(0,0,0,.25), 0 0 0 1px hsl(var(--border)/.3)",
            }}
          >
            <WeatherMap />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
