import { Activity, Bell, Shield, BarChart3, Globe, Cpu, Layers, Zap, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { SpotlightCard } from "../common/SpotlightCard";
import { SectionTitle } from "../common/SectionTitle";

function FeatureCard({
  icon,
  title,
  description,
  badge,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <SpotlightCard className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 backdrop-blur-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 cursor-default">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {badge && (
          <span className="absolute top-0 right-0 px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold tracking-[0.12em] uppercase border border-primary/25">
            {badge}
          </span>
        )}
        <div className="mb-5 w-10 h-10 rounded-xl bg-primary/10 border border-border/40 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors duration-300 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="mt-5">
          <span className="group-hover:opacity-100 group-hover:translate-x-0 flex items-center gap-1 opacity-0 transition-all duration-300 text-xs text-primary font-medium">
            Learn more <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}

const FEATURES = [
  {
    icon: <Activity className="w-5 h-5 text-primary" />,
    title: "Real-Time Telemetry",
    description: "Sub-second data streaming from thousands of field devices with automatic gap-filling and interpolation.",
    badge: "Core",
  },
  {
    icon: <Bell className="w-5 h-5 text-yellow-500" />,
    title: "Smart Alert Engine",
    description: "Rule-based and ML-driven anomaly detection with configurable escalation chains and on-call routing.",
  },
  {
    icon: <Shield className="w-5 h-5 text-emerald-500" />,
    title: "Zero-Trust Security",
    description: "End-to-end encryption, role-based access control, and full audit trail across every action.",
    badge: "Enterprise",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-cyan-500" />,
    title: "Advanced Analytics",
    description: "Interactive time-series charts, trend analysis, and predictive maintenance scoring.",
  },
  {
    icon: <Globe className="w-5 h-5 text-blue-500" />,
    title: "Geospatial Intelligence",
    description: "Layered map views with weather radar overlay, asset clustering, and spatial aggregation.",
  },
  {
    icon: <Cpu className="w-5 h-5 text-purple-500" />,
    title: "Edge Processing",
    description: "Local computation at the station level reduces bandwidth and enables offline resilience.",
    badge: "New",
  },
  {
    icon: <Layers className="w-5 h-5 text-orange-500" />,
    title: "Multi-Protocol Support",
    description: "Native support for Modbus, DNP3, IEC 60870, MQTT, and OPC-UA device protocols.",
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    title: "Automated Reporting",
    description: "Scheduled PDF/Excel exports with customizable templates for regulatory compliance.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "3rem 3rem",
        }}
      />
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Capabilities"
          title="Everything You Need to Monitor"
          subtitle="From edge device telemetry to executive dashboards — SCADA Control covers your entire operational stack."
          className="mb-16"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURES.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 60} direction="up">
              <FeatureCard {...card} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
