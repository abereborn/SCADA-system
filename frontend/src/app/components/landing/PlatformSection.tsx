import { Wifi, Database, Lock, Clock } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection";
import { ScanLine } from "../common/ScanLine";

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-5 group">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm font-bold shrink-0 group-hover:bg-primary/25 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
          {num}
        </div>
        <div
          className="w-px flex-1 mt-2"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary)/.35), transparent)" }}
        />
      </div>
      <div className="pb-8">
        <p className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors duration-300">
          {title}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

const ARCH_POINTS = [
  { icon: Wifi, label: "Multi-region replication with < 200ms failover" },
  { icon: Database, label: "Time-series database optimized for industrial workloads" },
  { icon: Lock, label: "SOC 2 Type II certified, GDPR compliant" },
  { icon: Clock, label: "24/7 NOC support with 15-minute SLA response" },
];

const HOW_IT_WORKS = [
  {
    num: "1",
    title: "Connect Your Devices",
    desc: "Install our lightweight edge agent on any PLC, RTU, or gateway. Configuration takes under 10 minutes with zero downtime.",
  },
  {
    num: "2",
    title: "Data Flows Automatically",
    desc: "Telemetry streams securely to our cloud pipeline. Data is validated, normalized, and stored in real-time.",
  },
  {
    num: "3",
    title: "Monitor & Alert",
    desc: "Your operations team gets a live dashboard, configurable alerts, and automated reports — from day one.",
  },
  {
    num: "4",
    title: "Optimize with Insights",
    desc: "Historical trends and predictive models surface opportunities to reduce downtime and operating costs.",
  },
];

export function PlatformSection() {
  return (
    <section id="platform" className="py-28 px-6 ab-bg-color/30 relative overflow-hidden">
      <ScanLine className="absolute top-0 inset-x-0" />
      <ScanLine className="absolute bottom-0 inset-x-0" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection direction="left">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight">
            Built for Industrial Scale
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            SCADA Control is engineered on a distributed cloud-native architecture with redundant
            data paths, ensuring that mission-critical monitoring never goes dark — even during
            network partitions.
          </p>
          <div className="space-y-4">
            {ARCH_POINTS.map(({ icon: Icon, label }, i) => (
              <AnimatedSection key={label} delay={i * 60} direction="left">
                <div className="flex items-start gap-3 group">
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed pt-1.5">
                    {label}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <div
            className="rounded-2xl border p-8 backdrop-blur-sm relative overflow-hidden"
            style={{
              background: "hsl(var(--card)/.6)",
              borderColor: "hsl(var(--border)/.7)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary)/.5), transparent)",
              }}
            />
            <p className="font-bold text-xs mb-7 text-muted-foreground uppercase tracking-[0.18em]">
              How It Works
            </p>
            {HOW_IT_WORKS.map((step) => (
              <Step key={step.num} {...step} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
