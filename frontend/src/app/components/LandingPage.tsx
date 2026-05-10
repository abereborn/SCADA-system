import { Link } from "react-router";
import {
  Activity,
  Shield,
  Bell,
  TrendingUp,
  Twitter,
  Linkedin,
  Github,
  Sun,
  Moon,
  ChevronRight,
  Cpu,
  Zap,
  Globe,
  BarChart3,
  Lock,
  Radio,
  Server,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Layers,
  Database,
  Wifi,
  Clock,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { WeatherMap } from "./WeatherMap";
import { useEffect, useRef, useState } from "react";

/* ─── Animated Counter ─── */
function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Stat Card ─── */
function StatCard({ value, suffix, label, icon: Icon }: { value: number; suffix?: string; label: string; icon: any }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-4 -translate-y-8 group-hover:bg-primary/10 transition-colors" />
      <Icon className="text-primary mb-3 w-5 h-5" />
      <p className="text-3xl font-bold tracking-tight">
        <CountUp end={value} suffix={suffix ?? ""} />
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, title, description, badge }: { icon: React.ReactNode; title: string; description: string; badge?: string }) {
  return (
    <div className="group relative rounded-2xl border border-border/60 bg-card/60 p-6 hover:border-primary/40 hover:bg-card transition-all duration-300 backdrop-blur-sm">
      {badge && <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-medium tracking-wide">{badge}</span>}
      <div className="mb-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">{icon}</div>
      <h3 className="font-semibold text-base mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}

/* ─── Timeline Step ─── */
function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm font-bold shrink-0">{num}</div>
        <div className="w-px flex-1 bg-border/50 mt-2" />
      </div>
      <div className="pb-8">
        <p className="font-semibold text-sm mb-1">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Testimonial ─── */
function Testimonial({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
      <div className="flex gap-1 mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
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
  );
}

/* ─── Main Component ─── */
export function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-base tracking-tight">
              SCADA<span className="text-primary">Control</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {["Features", "Platform", "Map", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all">
                {item}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-accent transition-all text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
            <Link to="/dashboard" className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium">
              Dashboard →
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-16 px-6 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] -z-10" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px] -z-10" />

        <div className="max-w-5xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Live System • 247 Stations Online
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold leading-[1.05] tracking-tight mb-6">
            Industrial SCADA
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">Monitoring Platform</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            Real-time geospatial monitoring, intelligent alerting, and predictive analytics for critical infrastructure across Indonesia — built for engineers who demand precision.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/dashboard" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:opacity-95 hover:scale-105 transition-all">
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="#map" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:bg-accent hover:border-primary/30 transition-all font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              View Live Map
            </a>
          </div>

          {/* Mini stats bar */}
          <div className="flex flex-wrap gap-6 text-sm">
            {[
              { label: "Uptime", value: "99.97%" },
              { label: "Avg. Latency", value: "< 50ms" },
              { label: "Data Points / Day", value: "1.2M+" },
              { label: "Regions Covered", value: "34" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating status panel */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-72 rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold">System Status</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">All Operational</span>
          </div>
          {[
            { name: "Data Ingestion", status: "Normal", color: "emerald" },
            { name: "Alert Engine", status: "Active", color: "emerald" },
            { name: "Weather Radar", status: "Syncing", color: "amber" },
            { name: "API Gateway", status: "Normal", color: "emerald" },
            { name: "Backup Node", status: "Standby", color: "blue" },
          ].map((s) => (
            <div key={s.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-sm text-muted-foreground">{s.name}</span>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full bg-${s.color}-500 ${s.status === "Syncing" ? "animate-pulse" : ""}`} />
                <span className="text-xs font-medium">{s.status}</span>
              </div>
            </div>
          ))}
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Processing Load</span>
              <span>63%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[63%] bg-gradient-to-r from-primary to-cyan-400 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard value={247} label="Active Stations" icon={Radio} />
            <StatCard value={34} label="Provinces Monitored" icon={Globe} />
            <StatCard value={1200000} suffix="+" label="Data Points / Day" icon={Database} />
            <StatCard value={99} suffix=".97%" label="Platform Uptime" icon={Server} />
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Monitor</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From edge device telemetry to executive dashboards — SCADA Control covers your entire operational stack.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <FeatureCard icon={<Activity className="w-5 h-5 text-primary" />} title="Real-Time Telemetry" description="Sub-second data streaming from thousands of field devices with automatic gap-filling and interpolation." badge="Core" />
            <FeatureCard icon={<Bell className="w-5 h-5 text-yellow-500" />} title="Smart Alert Engine" description="Rule-based and ML-driven anomaly detection with configurable escalation chains and on-call routing." />
            <FeatureCard icon={<Shield className="w-5 h-5 text-emerald-500" />} title="Zero-Trust Security" description="End-to-end encryption, role-based access control, and full audit trail across every action." badge="Enterprise" />
            <FeatureCard icon={<BarChart3 className="w-5 h-5 text-cyan-500" />} title="Advanced Analytics" description="Interactive time-series charts, trend analysis, and predictive maintenance scoring." />
            <FeatureCard icon={<Globe className="w-5 h-5 text-blue-500" />} title="Geospatial Intelligence" description="Layered map views with weather radar overlay, asset clustering, and spatial aggregation." />
            <FeatureCard icon={<Cpu className="w-5 h-5 text-purple-500" />} title="Edge Processing" description="Local computation at the station level reduces bandwidth and enables offline resilience." badge="New" />
            <FeatureCard icon={<Layers className="w-5 h-5 text-orange-500" />} title="Multi-Protocol Support" description="Native support for Modbus, DNP3, IEC 60870, MQTT, and OPC-UA device protocols." />
            <FeatureCard icon={<Zap className="w-5 h-5 text-amber-500" />} title="Automated Reporting" description="Scheduled PDF/Excel exports with customizable templates for regulatory compliance." />
          </div>
        </div>
      </section>

      {/* ─── PLATFORM OVERVIEW ─── */}
      <section id="platform" className="py-28 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Architecture</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">Built for Industrial Scale</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              SCADA Control is engineered on a distributed cloud-native architecture with redundant data paths, ensuring that mission-critical monitoring never goes dark — even during network partitions.
            </p>

            <div className="space-y-4">
              {[
                { icon: Wifi, label: "Multi-region replication with < 200ms failover" },
                { icon: Database, label: "Time-series database optimized for industrial workloads" },
                { icon: Lock, label: "SOC 2 Type II certified, GDPR compliant" },
                { icon: Clock, label: "24 / 7 NOC support with 15-minute SLA response" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed pt-1.5">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: how it works steps */}
          <div className="rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm">
            <p className="font-semibold text-sm mb-6 text-muted-foreground uppercase tracking-widest">How It Works</p>
            <Step num="1" title="Connect Your Devices" desc="Install our lightweight edge agent on any PLC, RTU, or gateway. Configuration takes under 10 minutes with zero downtime." />
            <Step num="2" title="Data Flows Automatically" desc="Telemetry streams securely to our cloud pipeline. Data is validated, normalized, and stored in real-time." />
            <Step num="3" title="Monitor & Alert" desc="Your operations team gets a live dashboard, configurable alerts, and automated reports — from day one." />
            <Step num="4" title="Optimize with Insights" desc="Historical trends and predictive models surface opportunities to reduce downtime and operating costs." />
          </div>
        </div>
      </section>

      {/* ─── LIVE MAP ─── */}
      <section id="map" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Live Coverage</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Indonesia Weather Radar</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Real-time radar imagery integrated directly with station monitoring data across all 34 provinces.</p>
          </div>

          {/* Map info bar */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {[
              { icon: Radio, label: "247 Active Stations", color: "emerald" },
              { icon: AlertTriangle, label: "3 Active Alerts", color: "amber" },
              { icon: CheckCircle2, label: "All Systems Normal", color: "blue" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-${color}-500/5 border-${color}-500/20 text-sm`}>
                <Icon className={`w-4 h-4 text-${color}-500`} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-border shadow-2xl" onWheel={(e) => e.stopPropagation()}>
            <WeatherMap />
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-28 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Trusted By</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Engineers Are Saying</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Teams across Indonesia's energy, water, and manufacturing sectors rely on SCADA Control daily.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Testimonial quote="We cut mean-time-to-detect from 45 minutes to under 3 minutes after switching to SCADA Control. The alert engine is exceptional." name="Budi Santoso" role="Head of Operations" company="PLN Distribusi Jawa" />
            <Testimonial
              quote="The geospatial overlay with weather radar has changed how we dispatch maintenance crews. We can now predict issues before they become outages."
              name="Sari Dewi"
              role="SCADA Engineer"
              company="Perusahaan Air Minum Jakarta"
            />
            <Testimonial
              quote="Integration was seamless with our existing Modbus devices. The team was up and running in a day, and the edge processing saves us significant bandwidth."
              name="Ahmad Fauzi"
              role="Automation Manager"
              company="Semen Indonesia Group"
            />
          </div>
        </div>
      </section>

      {/* ─── PRICING TEASER ─── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Plans</h2>
          <p className="text-muted-foreground">Scalable pricing that grows with your infrastructure.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
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
          ].map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-6 border ${plan.highlight ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 relative" : "border-border/60 bg-card/60"} backdrop-blur-sm`}>
              {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Most Popular</span>}
              <p className="font-bold text-base mb-1">{plan.name}</p>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="space-y-2.5 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:bg-accent"}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-cyan-500/10 p-12 text-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/15 blur-[80px] -z-10" />
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Get Started Today</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Modernize Your Operations?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">Join hundreds of Indonesian engineers who rely on SCADA Control for mission-critical infrastructure monitoring.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard" className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:opacity-95 hover:scale-105 transition-all">
              Open Dashboard Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:bg-accent transition-all font-medium">
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-base">
                  SCADA<span className="text-primary">Control</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">Industrial-grade monitoring platform for Indonesia's critical infrastructure. Built by engineers, for engineers.</p>
              <div className="flex gap-3 mt-5">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Platform", links: ["Dashboard", "Analytics", "Alerting", "Geospatial", "API Docs"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact", "Press"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Security", "Compliance"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
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
    </div>
  );
}
