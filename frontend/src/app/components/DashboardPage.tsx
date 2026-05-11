import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  Activity,
  Server,
  Bell,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
  ShieldAlert,
  LineChart,
  Database,
  Zap,
  Cpu,
  HardDrive,
  User,
  Edit,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Info,
  Wifi,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const C = {
  cyan: "#22d3ee",
  blue: "#38bdf8",
  emerald: "#34d399",
  amber: "#fbbf24",
  red: "#f87171",
  purple: "#a78bfa",
  slate: "#94a3b8",
};

const NAV_ITEMS = [
  { label: "Monitoring", to: "/dashboard", icon: <Activity className="w-5 h-5" />, end: true },
  { label: "Devices", to: "/dashboard/devices", icon: <Server className="w-5 h-5" />, end: false },
  { label: "Alerts", to: "/dashboard/alerts", icon: <Bell className="w-5 h-5" />, end: false, badge: 2 },
  { label: "Reports", to: "/dashboard/reports", icon: <FileText className="w-5 h-5" />, end: false },
  { label: "Settings", to: "/dashboard/settings", icon: <Settings className="w-5 h-5" />, end: false },
];

const ADVANCED_ITEMS = [
  { label: "Analytics", icon: <LineChart className="w-5 h-5" /> },
  { label: "Logs", icon: <Database className="w-5 h-5" /> },
  { label: "Automation", icon: <Zap className="w-5 h-5" /> },
  { label: "Integrations", icon: <Cpu className="w-5 h-5" /> },
  { label: "Network", icon: <Wifi className="w-5 h-5" /> },
  { label: "Storage", icon: <HardDrive className="w-5 h-5" /> },
];

const NOTIFICATIONS = [
  { id: 1, severity: "critical", title: "High Temperature Detected", desc: "Reactor B temp exceeded 90°C threshold", time: "2 min ago", read: false },
  { id: 2, severity: "warning", title: "Device Disconnected", desc: "Sensor T-12 lost connection unexpectedly", time: "8 min ago", read: false },
  { id: 3, severity: "info", title: "Maintenance Scheduled", desc: "Pump A-1 routine maintenance due in 3 days", time: "1 hr ago", read: true },
  { id: 4, severity: "info", title: "Backup System Activated", desc: "Secondary power source engaged automatically", time: "2 hrs ago", read: true },
  { id: 5, severity: "info", title: "New Report Generated", desc: "Monthly telemetry report is ready to view", time: "3 hrs ago", read: true },
];

function PulseDot({ color = C.emerald, size = 8 }: { color?: string; size?: number }) {
  return (
    <span className="relative flex" style={{ width: size, height: size }}>
      <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60" style={{ background: color }} />
      <span className="relative inline-flex rounded-full" style={{ width: size, height: size, background: color }} />
    </span>
  );
}

function Sidebar({ open, onClose, collapsed, onToggleCollapsed, isDark }: { open: boolean; onClose: () => void; collapsed: boolean; onToggleCollapsed: () => void; isDark: boolean }) {
  const navigate = useNavigate();

  const sidebarBg = isDark ? "linear-gradient(180deg, #0a0e27 0%, #080c1e 100%)" : "linear-gradient(180deg, #f1f5fb 0%, #e8edf7 100%)";
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const labelColor = isDark ? "#475569" : "#94a3b8";
  const navInactiveColor = isDark ? "#64748b" : "#64748b";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "#475569" : "#94a3b8";
  const advancedHover = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full transition-all duration-300 lg:relative lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{
          width: collapsed ? 72 : 260,
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          boxShadow: open ? "4px 0 40px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-4 h-16 flex-shrink-0" style={{ borderBottom: `1px solid ${borderColor}` }}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${C.cyan}22`, border: `1px solid ${C.cyan}44` }}>
                <Activity className="w-4 h-4" style={{ color: C.cyan }} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none" style={{ color: textPrimary }}>
                  SCADA
                </p>
                <p className="text-[9px] mt-0.5 uppercase tracking-widest" style={{ color: textMuted }}>
                  Control Center
                </p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${C.cyan}22`, border: `1px solid ${C.cyan}44` }}>
                <Activity className="w-4 h-4" style={{ color: C.cyan }} />
              </div>
            </div>
          )}
          <button onClick={onClose} className="lg:hidden p-1 transition-colors" style={{ color: textMuted }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6" style={{ scrollbarWidth: "none" }}>
          <div className="space-y-1">
            {!collapsed && (
              <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-widest" style={{ color: labelColor }}>
                Main
              </p>
            )}
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${collapsed ? "justify-center" : ""}`}
                style={({ isActive }) => ({
                  background: isActive ? `${C.cyan}18` : "transparent",
                  color: isActive ? C.cyan : navInactiveColor,
                  border: `1px solid ${isActive ? `${C.cyan}30` : "transparent"}`,
                })}
                title={collapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{ background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }} />}
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${C.red}33`, color: C.red }}>
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: C.red }} />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="space-y-1">
            {!collapsed && (
              <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-widest" style={{ color: labelColor }}>
                Advanced
              </p>
            )}
            {ADVANCED_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-not-allowed opacity-50 transition-all ${collapsed ? "justify-center" : ""}`}
                style={{ color: navInactiveColor }}
                title={collapsed ? `${item.label} (Coming Soon)` : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="font-medium">{item.label}</span>}
                {!collapsed && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded" style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: labelColor }}>
                    Soon
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {!collapsed && (
              <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-widest" style={{ color: labelColor }}>
                Admin
              </p>
            )}
            <NavLink
              to="/dashboard/admin"
              onClick={onClose}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${collapsed ? "justify-center" : ""}`}
              style={({ isActive }) => ({
                background: isActive ? `${C.red}18` : "transparent",
                color: isActive ? C.red : navInactiveColor,
                border: `1px solid ${isActive ? `${C.red}30` : "transparent"}`,
              })}
              title={collapsed ? "Master Admin" : undefined}
            >
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">Master Admin</span>}
            </NavLink>
          </div>
        </div>

        <div className="p-3 flex-shrink-0" style={{ borderTop: `1px solid ${borderColor}` }}>
          <button onClick={() => navigate("/login")} className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer transition-all hover:bg-red-500/10 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${C.cyan}22`, color: C.cyan, border: `1px solid ${C.cyan}44` }}>
              AD
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-semibold truncate" style={{ color: textPrimary }}>
                    Admin Operator
                  </p>
                  <p className="text-[10px] truncate" style={{ color: textMuted }}>
                    Jakarta NOC
                  </p>
                </div>
                <LogOut className="w-4 h-4 flex-shrink-0" style={{ color: C.red + "88" }} />
              </>
            )}
          </button>
        </div>
      </aside>

      <button
        onClick={onToggleCollapsed}
        className="hidden lg:flex fixed z-50 items-center justify-center w-5 h-10 rounded-r-xl transition-all hover:w-6"
        style={{
          left: collapsed ? 72 : 260,
          bottom: "5rem",
          background: `${C.cyan}22`,
          border: `1px solid ${C.cyan}44`,
          borderLeft: "none",
          color: C.cyan,
          transition: "left 0.3s ease, width 0.2s ease",
        }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </>
  );
}

function ProfileDropdown({ onClose, isDark }: { onClose: () => void; isDark: boolean }) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const dropBg = isDark ? "linear-gradient(135deg, rgba(10,14,39,0.99) 0%, rgba(8,12,30,0.99) 100%)" : "linear-gradient(135deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.99) 100%)";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSec = isDark ? "#94a3b8" : "#64748b";
  const itemHover = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const divider = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
      style={{
        background: dropBg,
        border: `1px solid ${border}`,
        backdropFilter: "blur(24px)",
        boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)" : "0 8px 40px rgba(0,0,0,0.15)",
        zIndex: 9999,
      }}
    >
      <div className="p-3" style={{ borderBottom: `1px solid ${divider}` }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: `${C.cyan}22`, color: C.cyan, border: `1px solid ${C.cyan}44` }}>
            AD
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: textPrimary }}>
              Admin Operator
            </p>
            <p className="text-[10px]" style={{ color: textSec }}>
              admin@scada.io
            </p>
          </div>
        </div>
      </div>
      <div className="p-1.5">
        {[
          { icon: <User className="w-4 h-4" />, label: "View Profile" },
          { icon: <Edit className="w-4 h-4" />, label: "Edit Profile" },
          { icon: <Settings className="w-4 h-4" />, label: "Account Settings" },
          { icon: <KeyRound className="w-4 h-4" />, label: "Change Password" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all group"
            style={{ color: textSec }}
            onMouseEnter={(e) => (e.currentTarget.style.background = itemHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={onClose}
          >
            <span style={{ color: C.cyan + "88" }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <div className="my-1.5" style={{ borderTop: `1px solid ${divider}` }} />
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all hover:bg-red-500/10"
          style={{ color: C.red }}
          onClick={() => {
            onClose();
            navigate("/login");
          }}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function NotificationDropdown({ onClose, isDark }: { onClose: () => void; isDark: boolean }) {
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notes.filter((n) => !n.read).length;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const dropBg = isDark ? "linear-gradient(135deg, rgba(10,14,39,0.99) 0%, rgba(8,12,30,0.99) 100%)" : "linear-gradient(135deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.99) 100%)";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const divider = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const itemHover = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";

  const sevColor: Record<string, string> = { critical: C.red, warning: C.amber, info: C.blue };
  const sevIcon: Record<string, React.ReactNode> = {
    critical: <AlertTriangle className="w-3.5 h-3.5" />,
    warning: <AlertTriangle className="w-3.5 h-3.5" />,
    info: <Info className="w-3.5 h-3.5" />,
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
      style={{
        background: dropBg,
        border: `1px solid ${border}`,
        backdropFilter: "blur(24px)",
        boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)" : "0 8px 40px rgba(0,0,0,0.15)",
        zIndex: 9999,
      }}
    >
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${divider}` }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: textPrimary }}>
            Notifications
          </p>
          {unreadCount > 0 && (
            <p className="text-[10px]" style={{ color: C.red }}>
              {unreadCount} unread alerts
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button className="text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all hover:opacity-80" style={{ color: C.cyan }} onClick={() => setNotes((n) => n.map((x) => ({ ...x, read: true })))}>
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
        {notes.map((note) => (
          <div
            key={note.id}
            className="px-4 py-3 cursor-pointer transition-all"
            style={{ borderBottom: `1px solid ${divider}`, opacity: note.read ? 0.6 : 1 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = itemHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => setNotes((n) => n.map((x) => (x.id === note.id ? { ...x, read: true } : x)))}
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${sevColor[note.severity]}20`, color: sevColor[note.severity] }}>
                {sevIcon[note.severity]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold truncate" style={{ color: textPrimary }}>
                    {note.title}
                  </p>
                  {!note.read && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.cyan }} />}
                </div>
                <p className="text-[10px] mt-0.5 line-clamp-1" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                  {note.desc}
                </p>
                <p className="text-[9px] mt-1" style={{ color: isDark ? "#475569" : "#94a3b8" }}>
                  {note.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2">
        <button className="w-full py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80" style={{ color: C.cyan }} onClick={onClose}>
          View all notifications
        </button>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  const pageBg = isDark ? "radial-gradient(ellipse at top left, #0a0e2788 0%, #060810 60%), #060810" : "radial-gradient(ellipse at top left, #dbeafe 0%, #f8fafc 60%), #f0f6ff";
  const topbarBg = isDark ? "rgba(8,12,30,0.92)" : "rgba(248,250,252,0.96)";
  const topbarBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const clockBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const clockBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  const clockColor = isDark ? "#64748b" : "#94a3b8";
  const iconColor = isDark ? "#64748b" : "#94a3b8";

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: pageBg, fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.05]" style={{ background: C.cyan, filter: "blur(100px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.03]" style={{ background: C.purple, filter: "blur(80px)" }} />
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} isDark={isDark} />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0">
        {/* Topbar — z-50 so dropdowns always paint above page content */}
        <header className="relative z-50 flex items-center justify-between px-4 lg:px-6 h-16 flex-shrink-0" style={{ background: topbarBg, borderBottom: `1px solid ${topbarBorder}`, backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70" style={{ color: iconColor }}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: `${C.emerald}12`, border: `1px solid ${C.emerald}33`, color: C.emerald }}>
              <PulseDot color={C.emerald} size={6} />
              All Systems Operational
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ color: clockColor, background: clockBg, border: `1px solid ${clockBorder}` }}>
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono">{now.toLocaleTimeString("en-GB", { hour12: false })}</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70"
              style={{ color: iconColor, background: clockBg, border: `1px solid ${clockBorder}` }}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button onClick={handleRefresh} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70" style={{ color: refreshing ? C.cyan : iconColor }} title="Refresh data">
              <RefreshCw className={`w-4 h-4 transition-transform ${refreshing ? "animate-spin" : ""}`} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications((s) => !s);
                  setShowProfile(false);
                }}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-70"
                style={{ color: showNotifications ? C.cyan : iconColor }}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: C.red, color: "#fff" }}>
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} isDark={isDark} />}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfile((s) => !s);
                  setShowNotifications(false);
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all hover:opacity-80"
                style={{
                  background: `${C.cyan}22`,
                  color: C.cyan,
                  border: `1px solid ${showProfile ? C.cyan + "66" : C.cyan + "33"}`,
                  boxShadow: showProfile ? `0 0 12px ${C.cyan}33` : "none",
                }}
              >
                AD
              </button>
              {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} isDark={isDark} />}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
