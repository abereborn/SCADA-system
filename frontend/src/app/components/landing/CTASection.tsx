import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection";

export function CTASection() {
  return (
    <section className="py-20 px-6">
      <AnimatedSection className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl p-12 text-center">
        <div
          className="absolute inset-0 -z-10 rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)/.12) 0%, hsl(var(--card)) 50%, hsl(200 100% 60%/.08) 100%)",
            border: "1px solid hsl(var(--primary)/.25)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 rounded-3xl opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: "3rem 3rem",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 -z-10"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--primary)/.2) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary)/.6) 30%, hsl(200 100% 60%/.6) 70%, transparent)",
          }}
        />

        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-5">
          Get Started Today
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
          Ready to Modernize Your Operations?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-9 leading-relaxed">
          Join hundreds of Indonesian engineers who rely on SCADA Control for mission-critical
          infrastructure monitoring.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/.85))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 8px 32px hsl(var(--primary)/.3)",
            }}
          >
            Open Dashboard Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl border font-medium transition-all duration-300 hover:scale-105 hover:bg-accent/50 backdrop-blur-sm"
            style={{ borderColor: "hsl(var(--border)/.7)" }}
          >
            Schedule a Demo
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
