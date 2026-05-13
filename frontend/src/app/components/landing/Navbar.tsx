import { Link } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";

interface NavbarProps {
  scrolled: boolean;
}

const NAV_LINKS = ["Features", "Platform", "Map", "Pricing"];

export function Navbar({ scrolled }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "ab-navColor backdrop-blur-xl border-b border-border/60 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18">
        <Link to="/" className="flex items-center group">
          <img src="/logo.png" alt="SCADA Logo" className="ab-scada-logo h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/70 rounded-lg transition-all duration-200">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-accent/70 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-border/70 hover:bg-accent/70 transition-all text-muted-foreground hover:text-foreground">
            Sign In
          </Link>
          <Link to="/dashboard" className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium shadow-lg shadow-primary/20">
            Dashboard →
          </Link>
        </div>
      </div>
    </nav>
  );
}
