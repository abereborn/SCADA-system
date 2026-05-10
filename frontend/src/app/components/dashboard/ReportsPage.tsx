import { useState } from "react";
import {
  Download, FileText, FileSpreadsheet, Calendar, Filter,
  BarChart3, LineChart as LineChartIcon, TrendingUp, TrendingDown,
  Clock, Activity, Zap, Droplet, Gauge
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const C = {
  cyan: "#22d3ee", blue: "#38bdf8", emerald: "#34d399",
  amber: "#fbbf24", red: "#f87171", purple: "#a78bfa", slate: "#94a3b8",
};

const DAILY_DATA = [
  { time: "00:00", temp: 42, pressure: 1.2, flow: 210, voltage: 374 },
  { time: "03:00", temp: 44, pressure: 1.3, flow: 215, voltage: 376 },
  { time: "06:00", temp: 51, pressure: 1.5, flow: 228, voltage: 378 },
  { time: "09:00", temp: 63, pressure: 1.9, flow: 258, voltage: 381 },
  { time: "12:00", temp: 71, pressure: 2.2, flow: 282, voltage: 385 },
  { time: "15:00", temp: 68, pressure: 2.0, flow: 268, voltage: 383 },
  { time: "18:00", temp: 58, pressure: 1.7, flow: 244, voltage: 380 },
  { time: "21:00", temp: 49, pressure: 1.4, flow: 221, voltage: 377 },
  { time: "24:00", temp: 43, pressure: 1.2, flow: 212, voltage: 374 },
];

const WEEKLY_DATA = [
  { time: "Mon", temp: 65, pressure: 1.8, flow: 248, voltage: 379, uptime: 99.8 },
  { time: "Tue", temp: 68, pressure: 1.9, flow: 255, voltage: 381, uptime: 99.9 },
  { time: "Wed", temp: 72, pressure: 2.1, flow: 271, voltage: 382, uptime: 99.5 },
  { time: "Thu", temp: 70, pressure: 2.0, flow: 263, voltage: 381, uptime: 99.7 },
  { time: "Fri", temp: 66, pressure: 1.8, flow: 250, voltage: 380, uptime: 100 },
  { time: "Sat", temp: 61, pressure: 1.6, flow: 238, voltage: 378, uptime: 99.9 },
  { time: "Sun", temp: 58, pressure: 1.5, flow: 229, voltage: 377, uptime: 99.8 },
];

const MONTHLY_DATA = [
  { time: "Week 1", temp: 64, pressure: 1.7, flow: 244, voltage: 379, incidents: 2 },
  { time: "Week 2", temp: 67, pressure: 1.85, flow: 251, voltage: 380, incidents: 1 },
  { time: "Week 3", temp: 71, pressure: 2.0, flow: 265, voltage: 382, incidents: 4 },
  { time: "Week 4", temp: 69, pressure: 1.9, flow: 258, voltage: 381, incidents: 1 },
];

const SUMMARY_STATS = [
  { label: "Avg Temperature", value: "67.2", unit: "°C", trend: "+1.2%", up: true, icon: <Gauge className="w-5 h-5" />, color: C.red },
  { label: "Avg Pressure", value: "1.84", unit: "bar", trend: "-0.3%", up: false, icon: <Activity className="w-5 h-5" />, color: C.blue },
  { label: "Avg Flow Rate", value: "251", unit: "L/min", trend: "+3.1%", up: true, icon: <Droplet className="w-5 h-5" />, color: C.cyan },
  { label: "System Uptime", value: "99.8", unit: "%", trend: "+0.1%", up: true, icon: <Zap className="w-5 h-5" />, color: C.emerald },
];

const REPORT_ITEMS = [
  { name: "Daily Operations Report", date: "May 10, 2026", type: "PDF", size: "2.4 MB", status: "ready" },
  { name: "Weekly Telemetry Summary", date: "May 5–10, 2026", type: "PDF", size: "5.8 MB", status: "ready" },
  { name: "Monthly System Analysis", date: "April 2026", type: "Excel", size: "8.2 MB", status: "ready" },
  { name: "Incident Report — Reactor B", date: "May 8, 2026", type: "PDF", size: "1.1 MB", status: "ready" },
  { name: "Energy Consumption Analysis", date: "April 2026", type: "Excel", size: "3.6 MB", status: "processing" },
];

type ChartType = "line" | "bar" | "area";
type Metric = "temp" | "pressure" | "flow" | "voltage";
type DateRange = "daily" | "weekly" | "monthly";

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

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl border text-xs" style={{ background: "#0d1117", borderColor: "rgba(255,255,255,0.12)", color: "#e2e8f0" }}>
      <p className="mb-1.5" style={{ color: "#64748b" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="flex items-center gap-1.5 mb-0.5" style={{ color: p.color }}>
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold">{typeof p.value === "number" ? p.value.toFixed(1) : p.value}</span>
        </p>
      ))}
    </div>
  );
}

export function ReportsPage() {
  const [chartType, setChartType] = useState<ChartType>("area");
  const [metric, setMetric] = useState<Metric>("temp");
  const [dateRange, setDateRange] = useState<DateRange>("weekly");
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = (format: string) => {
    setExporting(format);
    setTimeout(() => setExporting(null), 2000);
  };

  const metricConfig: Record<Metric, { label: string; color: string; unit: string }> = {
    temp: { label: "Temperature", color: C.red, unit: "°C" },
    pressure: { label: "Pressure", color: C.blue, unit: "bar" },
    flow: { label: "Flow Rate", color: C.cyan, unit: "L/min" },
    voltage: { label: "Voltage", color: C.amber, unit: "V" },
  };

  const chartData = dateRange === "daily" ? DAILY_DATA : dateRange === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;

  const renderChart = () => {
    const mc = metricConfig[metric];
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 10, left: -20, bottom: 5 },
    };
    const axisProps = {
      tick: { fontSize: 10, fill: "#475569" },
      tickLine: false,
      axisLine: false,
    };

    if (chartType === "area") return (
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mc.color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={mc.color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey={metric} name={mc.label} stroke={mc.color} fill="url(#areaGrad)" strokeWidth={2} dot={{ r: 3, fill: mc.color }} activeDot={{ r: 5 }} />
      </AreaChart>
    );
    if (chartType === "line") return (
      <LineChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey={metric} name={mc.label} stroke={mc.color} strokeWidth={2} dot={{ r: 3, fill: mc.color }} activeDot={{ r: 5 }} />
      </LineChart>
    );
    return (
      <BarChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="time" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey={metric} name={mc.label} fill={mc.color} radius={[4, 4, 0, 0]} fillOpacity={0.85} />
      </BarChart>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-5" style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Reports</h2>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>Generate, view, and export historical telemetry data</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport("CSV")} disabled={!!exporting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>
            <FileSpreadsheet className="w-4 h-4" />
            {exporting === "CSV" ? "Exporting..." : "CSV"}
          </button>
          <button onClick={() => handleExport("PDF")} disabled={!!exporting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
            style={{ background: `${C.cyan}20`, border: `1px solid ${C.cyan}44`, color: C.cyan }}>
            <FileText className="w-4 h-4" />
            {exporting === "PDF" ? "Generating..." : "Export PDF"}
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {SUMMARY_STATS.map((s) => (
          <GlassCard key={s.label} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20`, color: s.color }}>
                {s.icon}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: s.up ? C.emerald : C.red }}>
                {s.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {s.trend}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{s.value}<span className="text-sm font-normal ml-1" style={{ color: "#64748b" }}>{s.unit}</span></p>
            <p className="text-xs mt-1" style={{ color: "#64748b" }}>{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Main chart */}
      <GlassCard className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white">Historical Data View</h3>
            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
              {metricConfig[metric].label} · {dateRange.charAt(0).toUpperCase() + dateRange.slice(1)} View
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Date range */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {(["daily", "weekly", "monthly"] as DateRange[]).map((r) => (
                <button key={r} onClick={() => setDateRange(r)}
                  className="px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all"
                  style={{ background: dateRange === r ? `${C.cyan}20` : "transparent", color: dateRange === r ? C.cyan : "#64748b" }}>
                  {r}
                </button>
              ))}
            </div>
            {/* Chart type */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {([["area", <Activity className="w-4 h-4" />], ["line", <LineChartIcon className="w-4 h-4" />], ["bar", <BarChart3 className="w-4 h-4" />]] as [ChartType, React.ReactNode][]).map(([t, icon]) => (
                <button key={t} onClick={() => setChartType(t)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all"
                  style={{ background: chartType === t ? `${C.cyan}20` : "transparent", color: chartType === t ? C.cyan : "#64748b" }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metric selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.entries(metricConfig) as [Metric, typeof metricConfig[Metric]][]).map(([key, mc]) => (
            <button key={key} onClick={() => setMetric(key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: metric === key ? `${mc.color}22` : "rgba(255,255,255,0.05)",
                border: `1px solid ${metric === key ? mc.color + "44" : "rgba(255,255,255,0.08)"}`,
                color: metric === key ? mc.color : "#64748b",
              }}>
              <span className="w-2 h-2 rounded-full" style={{ background: mc.color }} />
              {mc.label}
            </button>
          ))}
        </div>

        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Saved reports */}
      <GlassCard className="overflow-hidden">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-sm font-semibold text-white">Saved Reports</h3>
          <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Recently generated reports available for download</p>
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {REPORT_ITEMS.map((report) => (
            <div key={report.name} className="flex items-center justify-between px-5 py-3.5 group transition-all hover:bg-white/03">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: report.type === "PDF" ? `${C.red}15` : `${C.emerald}15`, color: report.type === "PDF" ? C.red : C.emerald }}>
                  {report.type === "PDF" ? <FileText className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{report.name}</p>
                  <p className="text-[10px]" style={{ color: "#475569" }}>
                    <Clock className="w-2.5 h-2.5 inline mr-1" />{report.date} · {report.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}>{report.type}</span>
                {report.status === "ready" ? (
                  <button onClick={() => handleExport(report.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                    style={{ background: `${C.cyan}18`, border: `1px solid ${C.cyan}33`, color: C.cyan }}>
                    <Download className="w-3.5 h-3.5" />Download
                  </button>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-lg" style={{ background: `${C.amber}15`, color: C.amber }}>Processing…</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}
