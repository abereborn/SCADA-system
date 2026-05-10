import { useState, useEffect } from "react";
import {
  AlertTriangle, AlertCircle, Info, CheckCircle2, Clock, Filter,
  Bell, Shield, TrendingUp, X, RefreshCw, Activity, Zap
} from "lucide-react";

const C = {
  cyan: "#22d3ee", blue: "#38bdf8", emerald: "#34d399",
  amber: "#fbbf24", red: "#f87171", purple: "#a78bfa", slate: "#94a3b8",
};

type Severity = "critical" | "warning" | "info";
type AlertFilter = "all" | "active" | "resolved";

interface Alert {
  id: string;
  severity: Severity;
  title: string;
  message: string;
  source: string;
  location: string;
  timestamp: Date;
  resolved: boolean;
}

const INITIAL_ALERTS: Alert[] = [
  { id: "ALT-001", severity: "critical", title: "Pressure Spike Detected", message: "Main Pump Station A pressure exceeded safe threshold (145 PSI)", source: "Pump A", location: "Block A", timestamp: new Date(Date.now() - 1000 * 60 * 3), resolved: false },
  { id: "ALT-002", severity: "critical", title: "Reactor Temperature Critical", message: "Reactor B temperature above 90°C — cooling intervention required", source: "Reactor B", location: "Block B", timestamp: new Date(Date.now() - 1000 * 60 * 8), resolved: false },
  { id: "ALT-003", severity: "warning", title: "Cooling Tower Anomaly", message: "Cooling Tower B operating at reduced efficiency (68% health)", source: "Cooling B", location: "Block B", timestamp: new Date(Date.now() - 1000 * 60 * 22), resolved: false },
  { id: "ALT-004", severity: "warning", title: "Vibration Threshold Exceeded", message: "Motor M-2 vibration at 4.2 mm/s — maintenance recommended soon", source: "Motor M2", location: "Motor Bay", timestamp: new Date(Date.now() - 1000 * 60 * 45), resolved: false },
  { id: "ALT-005", severity: "info", title: "Scheduled Maintenance Reminder", message: "Primary Generator routine maintenance due in 3 days", source: "System", location: "Power Plant", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), resolved: true },
  { id: "ALT-006", severity: "critical", title: "Backup Generator Offline", message: "Backup generator failed to start during routine test sequence", source: "Generator 2", location: "Power Plant", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), resolved: true },
  { id: "ALT-007", severity: "info", title: "New Report Generated", message: "Monthly telemetry report for April 2026 is ready for review", source: "System", location: "Control Center", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), resolved: true },
  { id: "ALT-008", severity: "warning", title: "Network Latency Spike", message: "Sensor network experiencing 340ms latency — monitoring", source: "Network", location: "Control Center", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), resolved: true },
];

const NEW_ALERT_TEMPLATES = [
  { severity: "critical" as Severity, title: "Flow Rate Anomaly", message: "Unexpected flow rate increase detected in Sector 7", source: "Sensor F-7", location: "Sector 7" },
  { severity: "warning" as Severity, title: "Low Tank Level", message: "Tank A water level below 20% threshold", source: "Tank A", location: "Block A" },
  { severity: "info" as Severity, title: "Backup Activated", message: "Redundant control path automatically activated", source: "System", location: "Control Center" },
];

const SEV_CONFIG: Record<Severity, { icon: React.ReactNode; bigIcon: React.ReactNode; color: string; bg: string; border: string; label: string }> = {
  critical: { icon: <AlertCircle className="w-4 h-4" />, bigIcon: <AlertCircle className="w-5 h-5" />, color: C.red, bg: `${C.red}12`, border: `${C.red}33`, label: "Critical" },
  warning: { icon: <AlertTriangle className="w-4 h-4" />, bigIcon: <AlertTriangle className="w-5 h-5" />, color: C.amber, bg: `${C.amber}12`, border: `${C.amber}33`, label: "Warning" },
  info: { icon: <Info className="w-4 h-4" />, bigIcon: <Info className="w-5 h-5" />, color: C.blue, bg: `${C.blue}12`, border: `${C.blue}33`, label: "Info" },
};

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)",
      }}>
      {children}
    </div>
  );
}

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [filter, setFilter] = useState<AlertFilter>("all");
  const [sevFilter, setSevFilter] = useState<"all" | Severity>("all");
  const [newAlertFlash, setNewAlertFlash] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.65) {
        const template = NEW_ALERT_TEMPLATES[Math.floor(Math.random() * NEW_ALERT_TEMPLATES.length)];
        const newAlert: Alert = {
          id: `ALT-${String(Math.floor(Math.random() * 900) + 100)}`,
          ...template,
          timestamp: new Date(),
          resolved: false,
        };
        setAlerts((prev) => [newAlert, ...prev.slice(0, 19)]);
        setNewAlertFlash(true);
        setTimeout(() => setNewAlertFlash(false), 2000);
      }
    }, 18000);
    return () => clearInterval(timer);
  }, []);

  const resolveAlert = (id: string) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, resolved: true } : a));
  const resolveAll = () => setAlerts((prev) => prev.map((a) => ({ ...a, resolved: true })));

  const filtered = alerts.filter((a) => {
    const matchFilter = filter === "all" || (filter === "active" ? !a.resolved : a.resolved);
    const matchSev = sevFilter === "all" || a.severity === sevFilter;
    return matchFilter && matchSev;
  });

  const stats = {
    total: alerts.length,
    active: alerts.filter((a) => !a.resolved).length,
    critical: alerts.filter((a) => a.severity === "critical" && !a.resolved).length,
    warning: alerts.filter((a) => a.severity === "warning" && !a.resolved).length,
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-5" style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Alert Center</h2>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>Monitor and manage operational anomalies in real time</p>
        </div>
        <div className="flex items-center gap-2">
          {stats.active > 0 && (
            <button onClick={resolveAll} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
              style={{ background: `${C.emerald}18`, border: `1px solid ${C.emerald}33`, color: C.emerald }}>
              <CheckCircle2 className="w-3.5 h-3.5" />Acknowledge All
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${newAlertFlash ? "scale-105" : ""}`}
            style={{ background: newAlertFlash ? `${C.red}20` : `${C.red}10`, border: `1px solid ${newAlertFlash ? C.red + "66" : C.red + "30"}`, color: C.red, transition: "all 0.3s ease" }}>
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60" style={{ background: C.red }} />
              <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: C.red }} />
            </span>
            {stats.active} Active Alerts
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Alerts", value: stats.total, color: C.cyan, icon: <Bell className="w-5 h-5" /> },
          { label: "Active", value: stats.active, color: C.amber, icon: <Activity className="w-5 h-5" /> },
          { label: "Critical", value: stats.critical, color: C.red, icon: <AlertCircle className="w-5 h-5" /> },
          { label: "Warning", value: stats.warning, color: C.amber, icon: <AlertTriangle className="w-5 h-5" /> },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}20`, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs" style={{ color: "#64748b" }}>{s.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {(["all", "active", "resolved"] as AlertFilter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{
                  background: filter === f ? `${C.cyan}20` : "rgba(255,255,255,0.05)",
                  border: `1px solid ${filter === f ? C.cyan + "44" : "rgba(255,255,255,0.08)"}`,
                  color: filter === f ? C.cyan : "#64748b",
                }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === "active" && stats.active > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: `${C.red}30`, color: C.red }}>{stats.active}</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["all", "critical", "warning", "info"] as const).map((f) => (
              <button key={f} onClick={() => setSevFilter(f)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{
                  background: sevFilter === f ? (f === "all" ? `${C.cyan}20` : `${SEV_CONFIG[f as Severity]?.color ?? C.cyan}20`) : "rgba(255,255,255,0.05)",
                  border: `1px solid ${sevFilter === f ? (f === "all" ? C.cyan + "44" : (SEV_CONFIG[f as Severity]?.color ?? C.cyan) + "44") : "rgba(255,255,255,0.08)"}`,
                  color: sevFilter === f ? (f === "all" ? C.cyan : SEV_CONFIG[f as Severity]?.color) : "#64748b",
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Alert list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <GlassCard className="py-16 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" style={{ color: C.emerald }} />
            <p className="text-sm text-white font-medium">All Clear</p>
            <p className="text-xs mt-1" style={{ color: "#475569" }}>No alerts match the selected filter</p>
          </GlassCard>
        ) : (
          filtered.map((alert) => {
            const sc = SEV_CONFIG[alert.severity];
            return (
              <div key={alert.id}
                className="rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all hover:scale-[1.005]"
                style={{
                  background: alert.resolved ? "rgba(255,255,255,0.02)" : `linear-gradient(135deg, ${sc.bg}, rgba(255,255,255,0.01))`,
                  border: `1px solid ${alert.resolved ? "rgba(255,255,255,0.06)" : sc.border}`,
                  backdropFilter: "blur(20px)",
                  opacity: alert.resolved ? 0.65 : 1,
                }}>
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${sc.color}20`, color: sc.color }}>
                    {sc.bigIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: `${sc.color}22`, color: sc.color }}>
                        {sc.label}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "#64748b" }}>{alert.source}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.05)", color: "#475569" }}>{alert.location}</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-0.5">{alert.title}</p>
                    <p className="text-xs" style={{ color: "#64748b" }}>{alert.message}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px]" style={{ color: "#475569" }}>
                      <Clock className="w-3 h-3" />
                      {timeAgo(alert.timestamp)} · {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-2 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 w-full sm:w-auto flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.05)", color: "#475569" }}>{alert.id}</span>
                  {!alert.resolved ? (
                    <button onClick={() => resolveAlert(alert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                      style={{ background: `${C.emerald}18`, border: `1px solid ${C.emerald}33`, color: C.emerald }}>
                      <CheckCircle2 className="w-3.5 h-3.5" />Acknowledge
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: C.emerald }}>
                      <CheckCircle2 className="w-3.5 h-3.5" />Resolved
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}
