import { Link } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection";
import { SectionTitle } from "../common/SectionTitle";

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "Free",
    desc: "For small installations and pilots",
    features: ["Up to 10 stations", "7-day data history", "Email alerts", "Community support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "Rp 4.5M",
    period: "/ month",
    desc: "For growing operations teams",
    features: ["Up to 100 stations", "1-year data history", "Smart alert engine", "API access", "Priority support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large-scale deployments",
    features: ["Unlimited stations", "Unlimited history", "Dedicated SLA", "On-premise option", "24/7 NOC"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-28 px-6">
      <SectionTitle eyebrow="Pricing" title="Simple, Transparent Plans" subtitle="Scalable pricing that grows with your infrastructure." className="max-w-4xl mx-auto mb-14" />
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => (
          <AnimatedSection key={plan.name} delay={i * 100} direction="up">
            <div
              className="relative h-full rounded-2xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5"
              style={
                plan.highlight
                  ? {
                      background: "linear-gradient(145deg, hsl(var(--primary)/.18), hsl(var(--card)/.92))",
                      border: "1px solid hsl(var(--primary)/.6)",
                      boxShadow: "0 24px 70px hsl(var(--primary)/.22), 0 0 0 1px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.08)",
                    }
                  : {
                      background: "linear-gradient(145deg, hsl(var(--card)/.88), hsl(var(--card)/.72))",
                      border: "1px solid hsl(var(--border)/.85)",
                      boxShadow: "0 18px 50px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.03), inset 0 1px 0 rgba(255,255,255,.06)",
                    }
              }
            >
              {plan.highlight && (
                <>
                  <div
                    className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
                    }}
                  />
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/.8))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "0 4px 12px hsl(var(--primary)/.3)",
                    }}
                  >
                    Most Popular
                  </span>
                </>
              )}
              <p className="font-bold text-base mb-1">{plan.name}</p>
              <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
              <div className="flex items-baseline gap-1.5 mb-7">
                <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={
                  plan.highlight
                    ? {
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/.85))",
                        color: "hsl(var(--primary-foreground))",
                        boxShadow: "0 4px 16px hsl(var(--primary)/.25)",
                      }
                    : {
                        background: "hsl(var(--card)/.55)",
                        border: "1px solid hsl(var(--border)/.8)",
                      }
                }
              >
                {plan.cta}
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
