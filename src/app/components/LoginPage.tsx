import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function LoginPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Theme Toggle Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-accent/50 text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </div>

      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: \`
            linear-gradient(var(--color-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
          \`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 size-64 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 size-96 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      {/* Login Card */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="size-12 text-primary" />
              <h1 className="text-3xl font-bold">SCADA Control</h1>
            </div>
            <p className="text-muted-foreground">Industrial Monitoring & Control System</p>
          </div>

          {/* Login Form */}
          <div className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl mb-6 text-center font-medium">Login to Dashboard</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username/Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-muted-foreground font-medium text-sm">
                  Username / Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter your username or email"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-muted-foreground font-medium text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-border bg-background text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="ml-2 text-muted-foreground text-sm cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 font-medium transition-opacity shadow-lg shadow-primary/20"
              >
                Secure Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-primary hover:underline transition-all">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center text-muted-foreground/60 text-xs flex items-center justify-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500"></span>
            <p>Protected by enterprise-grade encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
