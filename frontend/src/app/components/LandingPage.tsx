import { Link } from "react-router";
import { Activity, Shield, Bell, TrendingUp, Twitter, Linkedin, Github, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { WeatherMap } from "./WeatherMap";

export function LandingPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Activity className="size-8 text-primary" />
              <span className="text-xl font-semibold">SCADA Control</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full bg-accent/50 text-foreground hover:bg-accent transition-colors" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <Link to="/login" className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">Smart SCADA Monitoring</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Advanced supervisory control and data acquisition platform featuring real-time geospatial weather monitoring across Indonesia.</p>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/dashboard" className="px-8 py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium shadow-lg shadow-primary/20">
              Open Dashboard
            </Link>
            <a href="#map-section" className="px-8 py-4 rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors">
              View Live Map
            </a>
          </div>
        </div>
      </section>

      {/* Indonesia Weather Map Section */}
      <section id="map-section" className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Indonesia Weather Radar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real-time visualization of temperature, rainfall, and humidity data across regions. Data simulation inspired by BMKG API endpoints.</p>
          </div>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <WeatherMap />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-center mb-16 font-bold">System Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Activity className="size-10 text-primary" />} title="Real-Time Telemetry" description="Monitor critical infrastructure parameters with millisecond precision and live chart updates." />
            <FeatureCard icon={<Shield className="size-10 text-emerald-500" />} title="Secure Control" description="Role-based access control and encrypted channels for remote operational commands." />
            <FeatureCard icon={<Bell className="size-10 text-amber-500" />} title="Smart Alerts" description="Color-coded severity levels with blinking indicators for rapid incident response." />
            <FeatureCard icon={<TrendingUp className="size-10 text-cyan-500" />} title="Advanced Analytics" description="Generate PDF and CSV reports from historical data and sensor trends." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="size-6 text-primary" />
                <span className="text-lg font-semibold">SCADA Control</span>
              </div>
              <p className="text-muted-foreground">Industrial grade monitoring and control.</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <p className="text-muted-foreground mb-2">support@scada-control.com</p>
              <p className="text-muted-foreground">+62 811 1234 5678</p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </Link>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard Demo
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex justify-between items-center flex-wrap gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 SCADA Systems Indonesia. All rights reserved.</p>
            <div className="flex gap-4">
              <Twitter className="size-5 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="size-5 hover:text-primary cursor-pointer transition-colors" />
              <Github className="size-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
