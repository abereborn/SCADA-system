import { useState, useEffect } from "react";
import {
  Gauge, Zap, Droplet, ThermometerSun, Activity, ArrowUpRight, ArrowDownRight,
  Minus, Circle, MapPin, AlertTriangle, Bell, RefreshCw, Wifi, WifiOff,
  CheckCircle2, AlertCircle, Server
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar
} from "recharts";

const C = {
  cyan: "#22d3ee", blue: "#38bdf8", emerald: "#34d399",
  amber: "#fbbf24", red: "#f87171", purple: "#a78bfa", slate: "#94a3b8",
};

type Status = "normal" | "warning" | "critical" | "offline";

function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)); }
function jitter(base: number, range: number) { return +(base + (Math.random() - 0.5) * range).toFixed(2); }
function genHistory(pts: number, base: number, range: number) {
  const now = Date.now();
  return Array.from({ length: pts }, (_, i) => ({
    t: new Date(now - (pts - i) * 3000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    v: jitter(base, range),
  }));
}
function useRealtime<T>(init: T, updater: (prev: T) => T, interval = 2000) {
  const [data, setData] = useState(init);
  useEffect(() => { const id = setInterval(() => setData(updater), interval); return () => clearInterval(id); }, []);
  return data;
}

function PulseDot({ color = C.emerald, size = 8 }: { color?: string; size?: number }) {
  return (
    <span className="relative flex" style={{ width: size, height: size }}>
      <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60" style={{ background: color }} />
      <span className="relative inline-flex rounded-full" style={{ width: size, height: size, background: color }} />
    </span>
  );
}

function GaugeRing({ value, max, color, size = 72 }: { value: number; max: number; color: string; size?: number }) {
  const pct = clamp(value / max, 0, 1);
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ * 0.75;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-225deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ - dash + circ * 0.25}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 6px ${color}88)` }} />
    </svg>
  );
}

function Spark({ data, color }: { data: number[]; color: string }) {
  const w = 80, h = 32;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; color: string; bg: string }> = {
    normal: { label: "Normal", color: C.emerald, bg: `${C.emerald}20` },
    warning: { label: "Warning", color: C.amber, bg: `${C.amber}20` },
    critical: { label: "Critical", color: C.red, bg: `${C.red}20` },
    offline: { label: "Offline", color: C.slate, bg: `${C.slate}20` },
  };
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase"
      style={{ color: s.color, background: s.bg }}>
      <Circle className="w-1.5 h-1.5 fill-current" />{s.label}
    </span>
  );
}

function MetricCard({ icon, title, value, unit, status, trend, max, color, sparkData }: {
  icon: React.ReactNode; title: string; value: string; unit: string;
  status: Status; trend: number; max: number; color: string; sparkData: number[];
}) {
  const numVal = parseFloat(value);
  const pct = Math.round(clamp((numVal / max) * 100, 0, 100));
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)",
      }}>
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: color, filter: "blur(24px)" }} />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
            <span style={{ color }}>{icon}</span>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest" style={{ color: "#64748b" }}>{title}</p>
            <StatusBadge status={status} />
          </div>
        </div>
        <Spark data={sparkData} color={color} />
      </div>
      <div className="flex items-end justify-between relative z-10">
        <div>
          <p className="text-3xl font-bold tracking-tight text-white leading-none">
            {value}<span className="text-base font-normal ml-1" style={{ color: "#64748b" }}>{unit}</span>
          </p>
          <div className="flex items-center gap-0.5 mt-1.5 text-xs font-medium"
            style={{ color: trend === 0 ? C.slate : trend > 0 ? C.emerald : C.red }}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : trend < 0 ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {trend !== 0 && (trend > 0 ? "+" : "")}{trend}%
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <GaugeRing value={numVal} max={max} color={color} size={72} />
          <span className="absolute text-[10px] font-bold" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <div className="h-1 rounded-full overflow-hidden relative z-10" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}88` }} />
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-lg border text-xs" style={{ background: "#0d1117", borderColor: "rgba(255,255,255,0.12)", color: "#e2e8f0" }}>
      <p className="mb-1" style={{ color: "#64748b" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-semibold">{typeof p.value === "number" ? p.value.toFixed(1) : p.value}</span></p>
      ))}
    </div>
  );
}

const SENSORS = [
  { id: "SNS-01", name: "Temp Sensor T-1", location: "Reactor Block A", value: "72.5°C", status: "normal" as Status, signal: 98 },
  { id: "SNS-02", name: "Pressure Sensor P-3", location: "Pump Station", value: "1.8 bar", status: "warning" as Status, signal: 82 },
  { id: "SNS-03", name: "Flow Sensor F-7", location: "Main Pipeline", value: "245 L/m", status: "normal" as Status, signal: 95 },
  { id: "SNS-04", name: "Voltage Sensor V-2", location: "Power Grid", value: "380 V", status: "normal" as Status, signal: 100 },
  { id: "SNS-05", name: "Level Sensor L-4", location: "Tank B", value: "68.3%", status: "normal" as Status, signal: 91 },
  { id: "SNS-06", name: "Vibration Sensor VB-1", location: "Motor M-2", value: "4.2 mm/s", status: "critical" as Status, signal: 44 },
];

const SYSTEM_STATUS = [
  { name: "Online", value: 18, color: C.emerald },
  { name: "Warning", value: 4, color: C.amber },
  { name: "Offline", value: 2, color: C.red },
];

export function MonitoringPage() {
  const metrics = useRealtime(
    { temp: 72.5, pressure: 1.8, flow: 245, voltage: 380 },
    (prev) => ({
      temp: +jitter(prev.temp, 4).toFixed(1),
      pressure: +jitter(prev.pressure, 0.2).toFixed(2),
      flow: +jitter(prev.flow, 15).toFixed(0),
      voltage: +jitter(prev.voltage, 5).toFixed(0),
    }),
    2000,
  );

  const sparkTemp = useRealtime(genHistory(12, 72.5, 8), (p) => [...p.slice(1), { t: "", v: jitter(72.5, 8) }], 2000);
  const sparkPressure = useRealtime(genHistory(12, 1.8, 0.4), (p) => [...p.slice(1), { t: "", v: jitter(1.8, 0.4) }], 2000);
  const sparkFlow = useRealtime(genHistory(12, 245, 30), (p) => [...p.slice(1), { t: "", v: jitter(245, 30) }], 2000);
  const sparkVoltage = useRealtime(genHistory(12, 380, 10), (p) => [...p.slice(1), { t: "", v: jitter(380, 10) }], 2200);

  const [chartHistory, setChartHistory] = useState(() => ({
    temp: genHistory(20, 72.5, 8),
    pressure: genHistory(20, 1.8, 0.4),
    flow: genHistory(20, 245, 30),
    voltage: genHistory(20, 380, 10),
  }));

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      setChartHistory((h) => ({
        temp: [...h.temp.slice(-19), { t: now, v: jitter(72.5, 8) }],
        pressure: [...h.pressure.slice(-19), { t: now, v: jitter(1.8, 0.4) }],
        flow: [...h.flow.slice(-19), { t: now, v: jitter(245, 30) }],
        voltage: [...h.voltage.slice(-19), { t: now, v: jitter(380, 10) }],
      }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const combined = chartHistory.temp.map((d, i) => ({
    t: d.t,
    Temperature: d.v,
    Pressure: (chartHistory.pressure[i]?.v ?? 1.8) * 100,
    Flow: chartHistory.flow[i]?.v ?? 245,
    Voltage: chartHistory.voltage[i]?.v ?? 380,
  }));

  const metricCards = [
    { icon: <ThermometerSun className="w-4 h-4" />, title: "Temperature", value: metrics.temp.toFixed(1), unit: "°C", status: (metrics.temp > 80 ? "critical" : metrics.temp > 75 ? "warning" : "normal") as Status, trend: 2.1, max: 100, color: C.red, sparkData: sparkTemp.map((d) => d.v) },
    { icon: <Gauge className="w-4 h-4" />, title: "Pressure", value: metrics.pressure.toFixed(2), unit: "bar", status: "normal" as Status, trend: -0.5, max: 5, color: C.blue, sparkData: sparkPressure.map((d) => d.v) },
    { icon: <Droplet className="w-4 h-4" />, title: "Flow Rate", value: metrics.flow.toFixed(0), unit: "L/min", status: (metrics.flow > 270 ? "warning" : "normal") as Status, trend: 5.2, max: 400, color: C.cyan, sparkData: sparkFlow.map((d) => d.v) },
    { icon: <Zap className="w-4 h-4" />, title: "Voltage", value: metrics.voltage.toFixed(0), unit: "V", status: "normal" as Status, trend: 0, max: 440, color: C.amber, sparkData: sparkVoltage.map((d) => d.v) },
  ];

  const statusColor: Record<Status, string> = {
    normal: C.emerald, warning: C.amber, critical: C.red, offline: C.slate,
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-5" style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Monitoring</h2>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>Real-time telemetry — updating every 2 seconds</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium"
          style={{ background: `${C.emerald}12`, border: `1px solid ${C.emerald}33`, color: C.emerald }}>
          <PulseDot color={C.emerald} size={6} />
          System Online
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metricCards.map((card) => <MetricCard key={card.title} {...card} />)}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <div className="lg:col-span-2 rounded-2xl p-5 flex flex-col"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Live Telemetry Stream</h3>
              <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Real-time sensor data feed</p>
            </div>
            <div className="flex items-center gap-2">
              <PulseDot color={C.cyan} size={6} />
              <span className="text-xs font-medium" style={{ color: C.cyan }}>LIVE</span>
            </div>
          </div>
          <div className="flex-1 min-h-0" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={combined} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  {[{ id: "temp", color: C.red }, { id: "pres", color: C.blue }, { id: "flow", color: C.cyan }, { id: "volt", color: C.amber }].map((g) => (
                    <linearGradient key={g.id} id={`grad-${g.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={g.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={g.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#475569" }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 9, fill: "#475569" }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Temperature" stroke={C.red} fill="url(#grad-temp)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="Pressure" stroke={C.blue} fill="url(#grad-pres)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="Flow" stroke={C.cyan} fill="url(#grad-flow)" strokeWidth={1.5} dot={false} />
                <Area type="monotone" dataKey="Voltage" stroke={C.amber} fill="url(#grad-volt)" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[{ label: "Temperature", color: C.red }, { label: "Pressure", color: C.blue }, { label: "Flow Rate", color: C.cyan }, { label: "Voltage", color: C.amber }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-[10px]" style={{ color: "#64748b" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System status pie */}
        <div className="rounded-2xl p-5 flex flex-col"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)" }}>
          <h3 className="text-sm font-semibold text-white mb-1">Device Status Overview</h3>
          <p className="text-xs mb-4" style={{ color: "#64748b" }}>24 total connected devices</p>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SYSTEM_STATUS} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {SYSTEM_STATUS.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {SYSTEM_STATUS.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs" style={{ color: "#94a3b8" }}>{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${(s.value / 24) * 100}%`, background: s.color }} />
                  </div>
                  <span className="text-xs font-semibold text-white w-5 text-right">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sensors + P&ID */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Sensor grid */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Sensor Status</h3>
            <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", color: "#64748b" }}>6 active sensors</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {SENSORS.map((s) => (
              <div key={s.id} className="p-3 rounded-xl group cursor-pointer transition-all hover:scale-[1.01]"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${statusColor[s.status]}33` }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: `${statusColor[s.status]}22` }}>
                        <Activity className="w-3 h-3" style={{ color: statusColor[s.status] }} />
                      </div>
                      <p className="text-xs font-semibold text-white truncate">{s.name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: "#475569" }}>
                      <MapPin className="w-2.5 h-2.5" />{s.location}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-white">{s.value}</p>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px]" style={{ color: "#475569" }}>Signal</span>
                    <span className="text-[9px] font-medium" style={{ color: statusColor[s.status] }}>{s.signal}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.signal}%`, background: statusColor[s.status] }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* P&ID mini */}
        <div className="rounded-2xl p-5 flex flex-col"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)" }}>
          <h3 className="text-sm font-semibold text-white mb-4">Process Flow</h3>
          <div className="flex-1 rounded-xl overflow-hidden relative"
            style={{ background: "#060810", border: "1px solid rgba(255,255,255,0.06)", minHeight: 260 }}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }} />
            <svg className="w-full h-full" viewBox="0 0 220 260" preserveAspectRatio="xMidYMid meet">
              {/* Tank A */}
              <rect x="10" y="40" width="50" height="70" fill="none" stroke={C.cyan} strokeWidth="1.5" rx="2" />
              <rect x="10" y="80" width="50" height="30" fill={C.cyan} fillOpacity="0.25">
                <animate attributeName="height" values="30;40;30" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y" values="80;70;80" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x="35" y="35" textAnchor="middle" fill={C.cyan} fontSize="8">Tank A</text>
              <circle cx="48" cy="48" r="4" fill={C.emerald}><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" /></circle>

              {/* Pipe Tank A → Pump */}
              <line x1="60" y1="75" x2="90" y2="75" stroke={C.cyan} strokeWidth="2" />
              <circle r="2.5" fill={C.blue}><animate attributeName="cx" values="60;90" dur="1.8s" repeatCount="indefinite" /><animate attributeName="cy" values="75;75" dur="1.8s" repeatCount="indefinite" /></circle>

              {/* Pump */}
              <circle cx="100" cy="75" r="14" fill="none" stroke={C.blue} strokeWidth="1.5" />
              <path d="M100 63 L108 75 L100 87 L92 75 Z" fill={C.blue} fillOpacity="0.4">
                <animateTransform attributeName="transform" type="rotate" from="0 100 75" to="360 100 75" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="100" y="100" textAnchor="middle" fill={C.blue} fontSize="8">Pump</text>

              {/* Pipe Pump → Valve */}
              <line x1="114" y1="75" x2="145" y2="75" stroke={C.cyan} strokeWidth="2" />
              <circle r="2.5" fill={C.blue}><animate attributeName="cx" values="114;145" dur="1.5s" repeatCount="indefinite" /><animate attributeName="cy" values="75;75" dur="1.5s" repeatCount="indefinite" /></circle>

              {/* Valve */}
              <path d="M155 68 L165 68 L160 78 Z" fill="none" stroke={C.amber} strokeWidth="1.5" />
              <line x1="160" y1="68" x2="160" y2="58" stroke={C.amber} strokeWidth="1.5" />
              <circle cx="160" cy="55" r="3.5" fill={C.amber} />
              <text x="160" y="92" textAnchor="middle" fill={C.amber} fontSize="8">Valve</text>

              {/* Pipe Valve → Tank B */}
              <line x1="165" y1="75" x2="175" y2="75" stroke={C.cyan} strokeWidth="2" />
              <line x1="175" y1="75" x2="175" y2="130" stroke={C.cyan} strokeWidth="2" />

              {/* Tank B */}
              <rect x="150" y="130" width="50" height="70" fill="none" stroke={C.cyan} strokeWidth="1.5" rx="2" />
              <rect x="150" y="170" width="50" height="30" fill={C.cyan} fillOpacity="0.25">
                <animate attributeName="height" values="30;45;30" dur="4s" repeatCount="indefinite" />
                <animate attributeName="y" values="170;155;170" dur="4s" repeatCount="indefinite" />
              </rect>
              <text x="175" y="125" textAnchor="middle" fill={C.cyan} fontSize="8">Tank B</text>
              <circle cx="190" cy="140" r="4" fill={C.emerald}><animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" /></circle>

              <text x="110" y="250" textAnchor="middle" fill="#475569" fontSize="7">Industrial Process Flow · SCADA</text>
            </svg>
          </div>
          <div className="flex gap-3 mt-3">
            {[{ label: "Normal", color: C.emerald }, { label: "Warning", color: C.amber }, { label: "Flow", color: C.cyan }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-[9px]" style={{ color: "#64748b" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
