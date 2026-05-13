import { Link } from "react-router";
import { Twitter, Linkedin, Github } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Platform",
    links: ["Dashboard", "Analytics", "Alerting", "Geospatial", "API Docs"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact", "Press"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security", "Compliance"],
  },
];

const SOCIAL_ICONS = [Twitter, Linkedin, Github];

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "linear-gradient(to bottom, hsl(var(--card)/.4), hsl(var(--background)))",
        borderColor: "hsl(var(--border)/.5)",
      }}
    >
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)/.3) 30%, hsl(200 100% 60%/.3) 70%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex mb-5 group">
              <img src="/logo.png" alt="SCADA Control" className="h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">Industrial-grade monitoring platform for Indonesia's critical infrastructure. Built by engineers, for engineers.</p>
            <div className="flex gap-2.5">
              {SOCIAL_ICONS.map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 hover:scale-110"
                  style={{ borderColor: "hsl(var(--border)/.6)" }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5 text-foreground/70">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-0.5 inline-block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted-foreground" style={{ borderColor: "hsl(var(--border)/.4)" }}>
          <p>© 2026 SCADA Systems Indonesia. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
