import { NavLink, useNavigate } from "react-router";
import { Activity, Server, Bell, FileText, Settings, LogOut, X, ChevronLeft, ChevronRight, LineChart, Database, Zap, Cpu, Wifi, HardDrive, ShieldAlert } from "lucide-react";
import { C } from "../../../constants/colors";

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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  isDark: boolean;
}

export function Sidebar({ open, onClose, collapsed, onToggleCollapsed, isDark }: SidebarProps) {
  const navigate = useNavigate();

  const sidebarBg = isDark ? "linear-gradient(180deg, #0a0e27 0%, #080c1e 100%)" : "linear-gradient(180deg, #f1f5fb 0%, #e8edf7 100%)";
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const labelColor = isDark ? "#475569" : "#94a3b8";
  const navInactiveColor = isDark ? "#64748b" : "#64748b";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "#475569" : "#94a3b8";

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
              <img src="/logo.png" alt="SCADA Logo" className="ab-scada-logo h-8 w-auto object-contain" />
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
                  <span
                    className="ml-auto text-[9px] px-1.5 py-0.5 rounded"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      color: labelColor,
                    }}
                  >
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
