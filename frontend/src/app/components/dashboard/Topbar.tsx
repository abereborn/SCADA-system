import { useState, useEffect } from "react";
import { Menu, RefreshCw, Clock, Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { C } from "../../../constants/colors";
import { PulseDot } from "../common/PulseDot";
import { ProfileDropdown } from "./ProfileDropdown";
import { NotificationDropdown } from "./NotificationDropdown";

const UNREAD_COUNT = 2;

interface TopbarProps {
  onMenuOpen: () => void;
}

export function Topbar({ onMenuOpen }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const topbarBg = isDark ? "rgba(8,12,30,0.92)" : "rgba(248,250,252,0.96)";
  const topbarBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const clockBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const clockBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  const clockColor = isDark ? "#64748b" : "#94a3b8";
  const iconColor = isDark ? "#64748b" : "#94a3b8";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";

  return (
    <header
      className="relative z-50 flex items-center justify-between px-4 lg:px-6 h-16 flex-shrink-0"
      style={{
        background: topbarBg,
        borderBottom: `1px solid ${topbarBorder}`,
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70"
          style={{ color: iconColor }}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: `${C.emerald}12`, border: `1px solid ${C.emerald}33`, color: C.emerald }}
        >
          <PulseDot color={C.emerald} size={6} />
          All Systems Operational
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
          style={{ color: clockColor, background: clockBg, border: `1px solid ${clockBorder}` }}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono">
            {now.toLocaleTimeString("en-GB", { hour12: false })}
          </span>
        </div>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70"
          style={{ color: iconColor, background: clockBg, border: `1px solid ${clockBorder}` }}
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70"
          style={{ color: refreshing ? C.cyan : iconColor }}
          title="Refresh data"
        >
          <RefreshCw className={`w-4 h-4 transition-transform ${refreshing ? "animate-spin" : ""}`} />
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications((s) => !s);
              setShowProfile(false);
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70 relative"
            style={{ color: showNotifications ? C.cyan : iconColor, background: clockBg, border: `1px solid ${showNotifications ? C.cyan + "44" : clockBorder}` }}
          >
            <Bell className="w-4 h-4" />
            {UNREAD_COUNT > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: C.red, color: "#fff" }}
              >
                {UNREAD_COUNT}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} isDark={isDark} />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowProfile((s) => !s);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all hover:opacity-80"
            style={{
              background: showProfile ? `${C.cyan}15` : clockBg,
              border: `1px solid ${showProfile ? C.cyan + "44" : clockBorder}`,
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: `${C.cyan}22`, color: C.cyan }}
            >
              AD
            </div>
            <span className="hidden sm:block text-xs font-medium" style={{ color: textPrimary }}>
              Admin
            </span>
          </button>
          {showProfile && (
            <ProfileDropdown onClose={() => setShowProfile(false)} isDark={isDark} />
          )}
        </div>
      </div>
    </header>
  );
}
