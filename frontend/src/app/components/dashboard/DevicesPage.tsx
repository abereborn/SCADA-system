import { useState } from "react";
import { Search, Filter, HardDrive, CheckCircle2, AlertTriangle, XCircle, ChevronRight, Activity, Thermometer, Droplets, Cpu, Zap, Clock, Wrench, Power, X, RefreshCw, Wifi, WifiOff, BarChart3, Server, Database, Shield } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const C = {
  cyan: "#22d3ee",
  blue: "#38bdf8",
  emerald: "#34d399",
  amber: "#fbbf24",
  red: "#f87171",
  purple: "#a78bfa",
  slate: "#94a3b8",
};

type DeviceStatus = "online" | "warning" | "offline";
type DeviceCategory = "all" | "Pump" | "Cooling" | "Power" | "Filter" | "Valve" | "Exchanger" | "Sensor";

const MOCK_DEVICES = [
  {
    id: "DEV-001",
    name: "Main Pump Station A",
    type: "Pump",
    status: "online" as DeviceStatus,
    health: 98,
    uptime: "99.9%",
    lastMaintenance: "2026-04-15",
    location: "Block A",
    temp: 42.5,
    pressure: 120,
    firmware: "v4.2.1",
    ip: "192.168.1.11",
  },
  {
    id: "DEV-002",
    name: "Cooling Tower B",
    type: "Cooling",
    status: "warning" as DeviceStatus,
    health: 75,
    uptime: "98.5%",
    lastMaintenance: "2026-03-20",
    location: "Block B",
    temp: 68.2,
    pressure: 95,
    firmware: "v3.8.0",
    ip: "192.168.1.12",
  },
  {
    id: "DEV-003",
    name: "Primary Generator",
    type: "Power",
    status: "online" as DeviceStatus,
    health: 100,
    uptime: "100%",
    lastMaintenance: "2026-05-01",
    location: "Power Plant",
    temp: 38.1,
    pressure: 110,
    firmware: "v5.1.0",
    ip: "192.168.1.13",
  },
  {
    id: "DEV-004",
    name: "Backup Generator",
    type: "Power",
    status: "offline" as DeviceStatus,
    health: 45,
    uptime: "85.2%",
    lastMaintenance: "2025-11-10",
    location: "Power Plant",
    temp: 22.0,
    pressure: 0,
    firmware: "v3.1.2",
    ip: "192.168.1.14",
  },
  {
    id: "DEV-005",
    name: "Water Filter Unit 1",
    type: "Filter",
    status: "online" as DeviceStatus,
    health: 92,
    uptime: "99.1%",
    lastMaintenance: "2026-04-28",
    location: "Treatment A",
    temp: 29.5,
    pressure: 88,
    firmware: "v4.0.3",
    ip: "192.168.1.15",
  },
  {
    id: "DEV-006",
    name: "Pressure Valve C",
    type: "Valve",
    status: "warning" as DeviceStatus,
    health: 68,
    uptime: "95.4%",
    lastMaintenance: "2026-02-14",
    location: "Block C",
    temp: 51.3,
    pressure: 142,
    firmware: "v2.9.1",
    ip: "192.168.1.16",
  },
  {
    id: "DEV-007",
    name: "Heat Exchanger",
    type: "Exchanger",
    status: "online" as DeviceStatus,
    health: 89,
    uptime: "99.7%",
    lastMaintenance: "2026-04-10",
    location: "Block A",
    temp: 77.8,
    pressure: 105,
    firmware: "v4.1.0",
    ip: "192.168.1.17",
  },
  {
    id: "DEV-008",
    name: "Vibration Sensor M2",
    type: "Sensor",
    status: "warning" as DeviceStatus,
    health: 61,
    uptime: "93.2%",
    lastMaintenance: "2026-01-20",
    location: "Motor Bay",
    temp: 35.0,
    pressure: 0,
    firmware: "v1.8.5",
    ip: "192.168.1.18",
  },
  {
    id: "DEV-009",
    name: "Secondary Pump B",
    type: "Pump",
    status: "online" as DeviceStatus,
    health: 96,
    uptime: "99.3%",
    lastMaintenance: "2026-04-22",
    location: "Block B",
    temp: 44.9,
    pressure: 118,
    firmware: "v4.2.0",
    ip: "192.168.1.19",
  },
];

const STATUS_CONFIG: Record<DeviceStatus, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  online: { icon: <CheckCircle2 className="w-4 h-4" />, color: C.emerald, bg: `${C.emerald}15`, label: "Online" },
  warning: { icon: <AlertTriangle className="w-4 h-4" />, color: C.amber, bg: `${C.amber}15`, label: "Warning" },
  offline: { icon: <XCircle className="w-4 h-4" />, color: C.red, bg: `${C.red}15`, label: "Offline" },
};

export function DevicesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const T = {
    textPrimary: isDark ? "#ffffff" : "#0f172a",
    textSec: isDark ? "#64748b" : "#94a3b8",
    textMuted: isDark ? "#475569" : "#94a3b8",
    cardBg: isDark ? "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))" : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    cardShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.07)",
    divider: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
    barTrack: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
    pillBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    pillBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    inputBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    inputBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    inputColor: isDark ? "#ffffff" : "#0f172a",
    rowBorder: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
    rowHover: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    miniCellBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    modalBg: isDark ? "linear-gradient(135deg, #0a0e27, #060810)" : "linear-gradient(135deg, #ffffff, #f8fafc)",
    modalBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<(typeof MOCK_DEVICES)[0] | null>(null);
  const [category, setCategory] = useState<DeviceCategory>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filtered = MOCK_DEVICES.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = category === "all" || d.type === category;
    return matchSearch && matchCat;
  });

  const counts = {
    online: MOCK_DEVICES.filter((d) => d.status === "online").length,
    warning: MOCK_DEVICES.filter((d) => d.status === "warning").length,
    offline: MOCK_DEVICES.filter((d) => d.status === "offline").length,
  };

  const categories: DeviceCategory[] = ["all", "Pump", "Cooling", "Power", "Filter", "Valve", "Exchanger", "Sensor"];

  const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-2xl ${className}`} style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, backdropFilter: "blur(20px)", boxShadow: T.cardShadow }}>
      {children}
    </div>
  );

  return (
    <div className="max-w-[1800px] mx-auto space-y-5" style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: T.textPrimary }}>
            Devices & Equipment
          </h2>
          <p className="text-sm mt-0.5" style={{ color: T.textSec }}>
            Manage and monitor all connected SCADA hardware
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80" style={{ background: `${C.cyan}18`, border: `1px solid ${C.cyan}44`, color: C.cyan }}>
          <RefreshCw className="w-4 h-4" />
          Sync Devices
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Online", count: counts.online, color: C.emerald, icon: <CheckCircle2 className="w-5 h-5" /> },
          { label: "Warning", count: counts.warning, color: C.amber, icon: <AlertTriangle className="w-5 h-5" /> },
          { label: "Offline", count: counts.offline, color: C.red, icon: <XCircle className="w-5 h-5" /> },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}20`, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: T.textPrimary }}>
                {s.count}
              </p>
              <p className="text-xs" style={{ color: T.textSec }}>
                {s.label}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{
                  background: category === cat ? `${C.cyan}20` : T.pillBg,
                  border: `1px solid ${category === cat ? C.cyan + "44" : T.pillBorder}`,
                  color: category === cat ? C.cyan : T.textSec,
                }}
              >
                {cat === "all" ? `All (${MOCK_DEVICES.length})` : cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.textMuted }} />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all placeholder-slate-500"
                style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.inputColor }}
              />
            </div>
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: T.pillBg, border: `1px solid ${T.pillBorder}` }}>
              <button
                onClick={() => setViewMode("table")}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ background: viewMode === "table" ? `${C.cyan}20` : "transparent", color: viewMode === "table" ? C.cyan : T.textSec }}
              >
                <Filter className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ background: viewMode === "grid" ? `${C.cyan}20` : "transparent", color: viewMode === "grid" ? C.cyan : T.textSec }}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {viewMode === "table" ? (
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead style={{ borderBottom: `1px solid ${T.divider}` }}>
                <tr>
                  {["Device ID", "Name & Location", "Type", "Status", "Health", "Uptime", ""].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.textMuted }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((device) => {
                  const sc = STATUS_CONFIG[device.status];
                  return (
                    <tr
                      key={device.id}
                      className="group transition-all cursor-pointer"
                      style={{ borderBottom: `1px solid ${T.rowBorder}` }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = T.rowHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      onClick={() => setSelectedDevice(device)}
                    >
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono font-medium px-2 py-1 rounded-md" style={{ background: T.pillBg, color: T.textSec }}>
                          {device.id}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${sc.color}15`, color: sc.color }}>
                            <HardDrive className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium group-hover:text-cyan-400 transition-colors" style={{ color: T.textPrimary }}>
                              {device.name}
                            </p>
                            <p className="text-[10px]" style={{ color: T.textMuted }}>
                              {device.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs px-2 py-1 rounded-md" style={{ background: T.pillBg, color: T.textSec }}>
                          {device.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg w-fit" style={{ background: sc.bg, color: sc.color }}>
                          {sc.icon}
                          <span className="text-xs font-medium">{sc.label}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: T.barTrack }}>
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${device.health}%`, background: device.health > 80 ? C.emerald : device.health > 50 ? C.amber : C.red }} />
                          </div>
                          <span className="text-xs font-semibold" style={{ color: T.textPrimary }}>
                            {device.health}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: T.textSec }}>
                        {device.uptime}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center ml-auto transition-all group-hover:text-cyan-400" style={{ color: T.textMuted }}>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center" style={{ color: T.textMuted }}>
                <Server className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No devices found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </GlassCard>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((device) => {
            const sc = STATUS_CONFIG[device.status];
            return (
              <GlassCard key={device.id} className="p-4 cursor-pointer group transition-all hover:scale-[1.02]" onClick={() => setSelectedDevice(device)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${sc.color}15`, color: sc.color }}>
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-cyan-400 transition-colors" style={{ color: T.textPrimary }}>
                        {device.name}
                      </p>
                      <p className="text-[10px]" style={{ color: T.textMuted }}>
                        {device.id} · {device.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium" style={{ background: sc.bg, color: sc.color }}>
                    {sc.icon}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 rounded-lg" style={{ background: T.miniCellBg }}>
                    <p className="text-[9px] mb-0.5" style={{ color: T.textMuted }}>
                      Temp
                    </p>
                    <p className="text-sm font-bold" style={{ color: T.textPrimary }}>
                      {device.temp}°C
                    </p>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: T.miniCellBg }}>
                    <p className="text-[9px] mb-0.5" style={{ color: T.textMuted }}>
                      Pressure
                    </p>
                    <p className="text-sm font-bold" style={{ color: T.textPrimary }}>
                      {device.pressure} PSI
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px]" style={{ color: T.textMuted }}>
                      Health Score
                    </span>
                    <span className="text-[9px] font-semibold" style={{ color: device.health > 80 ? C.emerald : device.health > 50 ? C.amber : C.red }}>
                      {device.health}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: T.barTrack }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${device.health}%`, background: device.health > 80 ? C.emerald : device.health > 50 ? C.amber : C.red }} />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {selectedDevice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ animation: "fadeIn 0.2s ease" }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedDevice(null)} />
          <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden" style={{ animation: "slideUp 0.25s ease", background: T.modalBg, border: `1px solid ${T.modalBorder}`, boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
            <div className="flex items-start justify-between p-6" style={{ borderBottom: `1px solid ${T.divider}` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${STATUS_CONFIG[selectedDevice.status].color}20`, color: STATUS_CONFIG[selectedDevice.status].color }}>
                  <HardDrive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: T.textPrimary }}>
                    {selectedDevice.name}
                  </h3>
                  <p className="text-xs" style={{ color: T.textSec }}>
                    {selectedDevice.id} · {selectedDevice.type} · {selectedDevice.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: STATUS_CONFIG[selectedDevice.status].bg, color: STATUS_CONFIG[selectedDevice.status].color }}>
                  {STATUS_CONFIG[selectedDevice.status].icon}
                  {STATUS_CONFIG[selectedDevice.status].label}
                </div>
                <button onClick={() => setSelectedDevice(null)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-70" style={{ color: T.textSec }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: T.textMuted }}>
                    Live Telemetry
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: <Thermometer className="w-4 h-4" />, label: "Temperature", value: `${selectedDevice.temp}°C`, color: C.red },
                      { icon: <Droplets className="w-4 h-4" />, label: "Pressure", value: `${selectedDevice.pressure} PSI`, color: C.blue },
                      { icon: <Activity className="w-4 h-4" />, label: "Health", value: `${selectedDevice.health}%`, color: C.emerald },
                      { icon: <Cpu className="w-4 h-4" />, label: "Uptime", value: selectedDevice.uptime, color: C.cyan },
                    ].map((m) => (
                      <div key={m.label} className="p-3 rounded-xl" style={{ background: T.miniCellBg, border: `1px solid ${T.divider}` }}>
                        <div className="flex items-center gap-1.5 mb-1.5" style={{ color: m.color }}>
                          {m.icon}
                          <span className="text-[10px] font-medium" style={{ color: T.textSec }}>
                            {m.label}
                          </span>
                        </div>
                        <p className="text-lg font-bold" style={{ color: T.textPrimary }}>
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: T.textMuted }}>
                    System Info
                  </p>
                  <div className="space-y-2 p-3 rounded-xl" style={{ background: T.miniCellBg, border: `1px solid ${T.divider}` }}>
                    {[
                      { label: "IP Address", value: selectedDevice.ip },
                      { label: "Firmware", value: selectedDevice.firmware },
                      { label: "Last Serviced", value: selectedDevice.lastMaintenance },
                      { label: "Next Service", value: "In 14 days" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-1" style={{ borderBottom: `1px solid ${T.divider}` }}>
                        <span className="text-xs" style={{ color: T.textSec }}>
                          {row.label}
                        </span>
                        <span className="text-xs font-medium" style={{ color: T.textPrimary }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: T.textMuted }}>
                    Health Score
                  </p>
                  <div className="p-4 rounded-xl" style={{ background: T.miniCellBg, border: `1px solid ${T.divider}` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-bold" style={{ color: T.textPrimary }}>
                        {selectedDevice.health}%
                      </span>
                      <div className="text-xs px-2 py-1 rounded-lg font-medium" style={{ background: selectedDevice.health > 80 ? `${C.emerald}20` : `${C.amber}20`, color: selectedDevice.health > 80 ? C.emerald : C.amber }}>
                        {selectedDevice.health > 80 ? "Good" : "Degraded"}
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: T.barTrack }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${selectedDevice.health}%`, background: selectedDevice.health > 80 ? C.emerald : selectedDevice.health > 50 ? C.amber : C.red }} />
                    </div>
                    <p className="text-[10px]" style={{ color: T.textMuted }}>
                      Uptime: {selectedDevice.uptime}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: T.textMuted }}>
                    Actions
                  </p>
                  <div className="space-y-2">
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                      style={{ background: `${C.cyan}20`, border: `1px solid ${C.cyan}44`, color: C.cyan }}
                    >
                      <Activity className="w-4 h-4" />
                      Run Diagnostics
                    </button>
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                      style={{ background: T.pillBg, border: `1px solid ${T.pillBorder}`, color: T.textSec }}
                    >
                      <Wrench className="w-4 h-4" />
                      Schedule Maintenance
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80" style={{ background: `${C.red}12`, border: `1px solid ${C.red}30`, color: C.red }}>
                      <Power className="w-4 h-4" />
                      Emergency Shutdown
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
