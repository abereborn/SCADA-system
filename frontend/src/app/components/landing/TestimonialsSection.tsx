import { AnimatedSection } from "../common/AnimatedSection";
import { SpotlightCard } from "../common/SpotlightCard";
import { SectionTitle } from "../common/SectionTitle";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  company: string;
}

function Testimonial({ quote, name, role, company }: TestimonialData) {
  return (
    <SpotlightCard className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm hover:border-primary/30 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-default">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex gap-0.5 mb-5">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">
              {role} · {company}
            </p>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "SCADA Control transformed how we manage our reservoir networks. Real-time visibility across all 12 sites has reduced our response time from hours to minutes.",
    name: "Budi Santoso",
    role: "NOC Director",
    company: "PT Jasa Tirta I",
  },
  {
    quote: "The alert engine alone saved us from three major pipeline incidents this quarter. The ML anomaly detection catches things our team would have missed.",
    name: "Dewi Rahayu",
    role: "Operations Manager",
    company: "PLN Regional Jawa",
  },
  {
    quote: "Deploying to 40+ remote substations took less than a week. The edge agent is incredibly lightweight and the onboarding documentation is top-notch.",
    name: "Eko Prasetyo",
    role: "Lead Engineer",
    company: "Pertamina Gas",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Trusted by Engineers"
          title="What Our Operators Say"
          subtitle="Used by critical infrastructure teams across Indonesia's energy, water, and manufacturing sectors."
          className="mb-14"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 100} direction="up">
              <Testimonial {...t} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
