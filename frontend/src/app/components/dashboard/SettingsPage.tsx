import { useState } from "react";
import {
  User, Bell, Shield, Cpu, Palette, Database, Globe, Key,
  ChevronRight, Check, X, Eye, EyeOff, Save, RefreshCw,
  Wifi, Server, Activity, Zap, Moon, Sun, Monitor, Lock
} from "lucide-react";

const C = {
  cyan: "#22d3ee", blue: "#38bdf8", emerald: "#34d399",
  amber: "#fbbf24", red: "#f87171", purple: "#a78bfa", slate: "#94a3b8",
};

type SettingsTab = "profile" | "notifications" | "security" | "system" | "appearance" | "integrations";

const TABS: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  { id: "system", label: "System", icon: <Cpu className="w-4 h-4" /> },
  { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
  { id: "integrations", label: "Integrations", icon: <Globe className="w-4 h-4" /> },
];

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

function Toggle({ enabled, onToggle, color = C.cyan }: { enabled: boolean; onToggle: () => void; color?: string }) {
  return (
    <button onClick={onToggle} className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
      style={{ background: enabled ? color : "rgba(255,255,255,0.1)" }}>
      <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-sm"
        style={{ transform: enabled ? "translateX(20px)" : "translateX(0)" }} />
    </button>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{desc}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {desc && <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{desc}</p>}
    </div>
  );
}

function ProfileTab() {
  const [name, setName] = useState("Admin Operator");
  const [email, setEmail] = useState("admin@scada.io");
  const [role] = useState("Master Administrator");
  const [location, setLocation] = useState("Jakarta NOC");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    borderRadius: 12,
    padding: "10px 14px",
    width: "100%",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="space-y-5">
      <GlassCard className="p-5">
        <SectionHeader title="Personal Information" desc="Update your profile details and contact information" />
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
            style={{ background: `${C.cyan}22`, color: C.cyan, border: `1px solid ${C.cyan}44` }}>
            AD
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1">Profile Avatar</p>
            <p className="text-xs mb-2" style={{ color: "#64748b" }}>Your initials are used as your avatar</p>
            <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: `${C.cyan}18`, border: `1px solid ${C.cyan}33`, color: C.cyan }}>
              Change Avatar
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: name, setter: setName },
            { label: "Email Address", value: email, setter: setEmail },
            { label: "Location / Station", value: location, setter: setLocation },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>{field.label}</label>
              <input type="text" value={field.value} onChange={(e) => field.setter(e.target.value)} style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = `${C.cyan}66`; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }} />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>Role</label>
            <input type="text" value={role} readOnly style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ background: saved ? `${C.emerald}22` : `${C.cyan}20`, border: `1px solid ${saved ? C.emerald + "44" : C.cyan + "44"}`, color: saved ? C.emerald : C.cyan }}>
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    criticalAlerts: true, warningAlerts: true, infoAlerts: false,
    emailNotifs: true, smsNotifs: false, desktopPush: true,
    maintenanceReminders: true, reportReady: true, deviceOffline: true,
    soundEnabled: false, quietHours: false,
  });

  const toggle = (key: keyof typeof settings) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="space-y-5">
      <GlassCard className="p-5">
        <SectionHeader title="Alert Notifications" desc="Control which system alerts trigger notifications" />
        <SettingRow label="Critical Alerts" desc="Immediate notification for all critical system events">
          <Toggle enabled={settings.criticalAlerts} onToggle={() => toggle("criticalAlerts")} color={C.red} />
        </SettingRow>
        <SettingRow label="Warning Alerts" desc="Notifications for warning-level anomalies">
          <Toggle enabled={settings.warningAlerts} onToggle={() => toggle("warningAlerts")} color={C.amber} />
        </SettingRow>
        <SettingRow label="Info & Status Updates" desc="General informational system messages">
          <Toggle enabled={settings.infoAlerts} onToggle={() => toggle("infoAlerts")} color={C.blue} />
        </SettingRow>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionHeader title="Delivery Channels" desc="Choose how you receive notifications" />
        <SettingRow label="Email Notifications" desc="Send alerts to admin@scada.io">
          <Toggle enabled={settings.emailNotifs} onToggle={() => toggle("emailNotifs")} />
        </SettingRow>
        <SettingRow label="SMS Notifications" desc="Text messages for critical events (requires phone number)">
          <Toggle enabled={settings.smsNotifs} onToggle={() => toggle("smsNotifs")} />
        </SettingRow>
        <SettingRow label="Desktop Push Notifications" desc="Browser push notifications while logged in">
          <Toggle enabled={settings.desktopPush} onToggle={() => toggle("desktopPush")} />
        </SettingRow>
        <SettingRow label="Notification Sounds" desc="Play sound for incoming critical alerts">
          <Toggle enabled={settings.soundEnabled} onToggle={() => toggle("soundEnabled")} />
        </SettingRow>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionHeader title="Specific Events" desc="Fine-tune which events trigger notifications" />
        <SettingRow label="Maintenance Reminders" desc="Scheduled maintenance due date reminders">
          <Toggle enabled={settings.maintenanceReminders} onToggle={() => toggle("maintenanceReminders")} />
        </SettingRow>
        <SettingRow label="Report Generated" desc="Alert when system reports are ready to download">
          <Toggle enabled={settings.reportReady} onToggle={() => toggle("reportReady")} />
        </SettingRow>
        <SettingRow label="Device Goes Offline" desc="Immediate alert when any device loses connection">
          <Toggle enabled={settings.deviceOffline} onToggle={() => toggle("deviceOffline")} color={C.red} />
        </SettingRow>
        <div style={{ borderBottom: "none" }}>
          <SettingRow label="Quiet Hours" desc="Suppress non-critical notifications from 22:00–06:00">
            <Toggle enabled={settings.quietHours} onToggle={() => toggle("quietHours")} />
          </SettingRow>
        </div>
      </GlassCard>
    </div>
  );
}

function SecurityTab() {
  const [show, setShow] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [ipWhitelist, setIpWhitelist] = useState(false);

  const SESSIONS = [
    { device: "Chrome · Windows 11", location: "Jakarta, ID", time: "Active now", current: true },
    { device: "Firefox · MacOS", location: "Bandung, ID", time: "2 hours ago", current: false },
    { device: "Mobile App · iOS", location: "Jakarta, ID", time: "1 day ago", current: false },
  ];

  return (
    <div className="space-y-5">
      <GlassCard className="p-5">
        <SectionHeader title="Authentication" desc="Manage your login credentials and two-factor authentication" />
        <div className="mb-4">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>Current Password</label>
          <div className="relative">
            <input type={show ? "text" : "password"} placeholder="••••••••••••" className="w-full pr-10"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none", width: "100%" }} />
            <button onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#64748b" }}>
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {["New Password", "Confirm Password"].map((label) => (
            <div key={label}>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "#64748b" }}>{label}</label>
              <input type="password" placeholder="••••••••••••"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none", width: "100%" }} />
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
          style={{ background: `${C.cyan}20`, border: `1px solid ${C.cyan}44`, color: C.cyan }}>
          <Lock className="w-4 h-4" />Update Password
        </button>

        <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <SettingRow label="Two-Factor Authentication" desc="Use TOTP app for login verification (recommended)">
            <Toggle enabled={twoFA} onToggle={() => setTwoFA((s) => !s)} color={C.emerald} />
          </SettingRow>
          <SettingRow label="IP Whitelist" desc="Restrict access to approved IP addresses only">
            <Toggle enabled={ipWhitelist} onToggle={() => setIpWhitelist((s) => !s)} />
          </SettingRow>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionHeader title="Active Sessions" desc="Manage devices logged into your account" />
        <div className="space-y-3">
          {SESSIONS.map((s) => (
            <div key={s.device} className="flex items-center justify-between gap-3 p-3 rounded-xl"
              style={{ background: s.current ? `${C.cyan}08` : "rgba(255,255,255,0.03)", border: `1px solid ${s.current ? C.cyan + "22" : "rgba(255,255,255,0.06)"}` }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${C.cyan}15`, color: C.cyan }}>
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{s.device}</p>
                  <p className="text-[10px]" style={{ color: "#475569" }}>{s.location} · {s.time}</p>
                </div>
              </div>
              {s.current ? (
                <span className="text-[10px] px-2 py-1 rounded-lg font-medium" style={{ background: `${C.emerald}18`, color: C.emerald }}>Current</span>
              ) : (
                <button className="text-[10px] px-2 py-1 rounded-lg font-medium transition-all hover:opacity-80"
                  style={{ background: `${C.red}15`, color: C.red }}>
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function SystemTab() {
  const [settings, setSettings] = useState({
    autoUpdate: true, telemetryInterval: "2", retentionDays: "90",
    redundancyMode: true, autoBackup: true, diagnosticsEnabled: true,
    remoteAccess: false, apiAccess: true,
  });
  const toggle = (key: keyof typeof settings) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const SYSTEM_INFO = [
    { label: "SCADA Version", value: "v6.2.1 (Build 2614)" },
    { label: "Database", value: "PostgreSQL 15.3" },
    { label: "Last System Update", value: "May 5, 2026 08:30" },
    { label: "Server Uptime", value: "14 days, 6 hours" },
    { label: "Connected Devices", value: "24 / 32" },
    { label: "Active Data Streams", value: "96 feeds" },
  ];

  return (
    <div className="space-y-5">
      <GlassCard className="p-5">
        <SectionHeader title="System Information" desc="Current SCADA system status and version info" />
        <div className="grid sm:grid-cols-2 gap-2">
          {SYSTEM_INFO.map((info) => (
            <div key={info.label} className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-xs" style={{ color: "#64748b" }}>{info.label}</span>
              <span className="text-xs font-medium text-white">{info.value}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionHeader title="Data Configuration" desc="Control telemetry collection and data retention" />
        <SettingRow label="Telemetry Interval (seconds)" desc="How often sensor data is polled and recorded">
          <select value={settings.telemetryInterval} onChange={(e) => setSettings((s) => ({ ...s, telemetryInterval: e.target.value }))}
            className="px-3 py-2 rounded-lg text-sm appearance-none cursor-pointer"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", outline: "none" }}>
            {["1", "2", "5", "10", "30", "60"].map((v) => <option key={v} value={v}>{v}s</option>)}
          </select>
        </SettingRow>
        <SettingRow label="Data Retention Period" desc="How long historical telemetry data is kept">
          <select value={settings.retentionDays} onChange={(e) => setSettings((s) => ({ ...s, retentionDays: e.target.value }))}
            className="px-3 py-2 rounded-lg text-sm appearance-none cursor-pointer"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", outline: "none" }}>
            {["30", "60", "90", "180", "365"].map((v) => <option key={v} value={v}>{v} days</option>)}
          </select>
        </SettingRow>
        <SettingRow label="Automatic System Backup" desc="Daily encrypted backup of all system data">
          <Toggle enabled={settings.autoBackup} onToggle={() => toggle("autoBackup")} />
        </SettingRow>
        <SettingRow label="Redundancy Mode" desc="Enable failover redundancy for critical processes">
          <Toggle enabled={settings.redundancyMode} onToggle={() => toggle("redundancyMode")} color={C.emerald} />
        </SettingRow>
        <SettingRow label="Auto Update System" desc="Automatically apply firmware and software updates">
          <Toggle enabled={settings.autoUpdate} onToggle={() => toggle("autoUpdate")} />
        </SettingRow>
        <SettingRow label="Remote API Access" desc="Allow external API connections to this SCADA instance">
          <Toggle enabled={settings.apiAccess} onToggle={() => toggle("apiAccess")} />
        </SettingRow>
      </GlassCard>
    </div>
  );
}

function AppearanceTab() {
  const [themeMode, setThemeMode] = useState<"dark" | "light" | "system">("dark");
  const [accentColor, setAccentColor] = useState(C.cyan);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [glowEffects, setGlowEffects] = useState(true);

  const ACCENTS = [C.cyan, C.blue, C.emerald, C.purple, C.amber, C.red];

  return (
    <div className="space-y-5">
      <GlassCard className="p-5">
        <SectionHeader title="Theme" desc="Customize the visual appearance of the dashboard" />
        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: "#64748b" }}>Color Mode</p>
          <div className="flex gap-3">
            {([["dark", <Moon className="w-4 h-4" />], ["light", <Sun className="w-4 h-4" />], ["system", <Monitor className="w-4 h-4" />]] as [string, React.ReactNode][]).map(([mode, icon]) => (
              <button key={mode} onClick={() => setThemeMode(mode as any)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium capitalize transition-all"
                style={{
                  background: themeMode === mode ? `${C.cyan}20` : "rgba(255,255,255,0.05)",
                  border: `1px solid ${themeMode === mode ? C.cyan + "44" : "rgba(255,255,255,0.08)"}`,
                  color: themeMode === mode ? C.cyan : "#64748b",
                }}>
                {icon}{mode}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: "#64748b" }}>Accent Color</p>
          <div className="flex gap-2.5">
            {ACCENTS.map((color) => (
              <button key={color} onClick={() => setAccentColor(color)}
                className="w-8 h-8 rounded-lg transition-all hover:scale-110"
                style={{ background: color, border: `2px solid ${accentColor === color ? "#fff" : "transparent"}`, boxShadow: accentColor === color ? `0 0 10px ${color}88` : "none" }}>
                {accentColor === color && <Check className="w-4 h-4 text-white mx-auto" />}
              </button>
            ))}
          </div>
        </div>
        <SettingRow label="Compact Mode" desc="Reduce padding and spacing for more data density">
          <Toggle enabled={compactMode} onToggle={() => setCompactMode((s) => !s)} />
        </SettingRow>
        <SettingRow label="Smooth Animations" desc="Enable transition and motion effects throughout the UI">
          <Toggle enabled={animationsEnabled} onToggle={() => setAnimationsEnabled((s) => !s)} />
        </SettingRow>
        <SettingRow label="Neon Glow Effects" desc="Enable ambient glow effects on cards and indicators">
          <Toggle enabled={glowEffects} onToggle={() => setGlowEffects((s) => !s)} />
        </SettingRow>
      </GlassCard>
    </div>
  );
}

function IntegrationsTab() {
  const INTEGRATIONS = [
    { name: "InfluxDB", desc: "Time-series database for telemetry storage", status: "connected", color: C.cyan, icon: <Database className="w-5 h-5" /> },
    { name: "Grafana", desc: "External dashboard visualization platform", status: "connected", color: C.amber, icon: <Activity className="w-5 h-5" /> },
    { name: "MQTT Broker", desc: "IoT messaging protocol for device communication", status: "connected", color: C.emerald, icon: <Wifi className="w-5 h-5" /> },
    { name: "OPC-UA Server", desc: "Industry-standard machine-to-machine protocol", status: "disconnected", color: C.blue, icon: <Server className="w-5 h-5" /> },
    { name: "Modbus TCP", desc: "Serial communication protocol for PLCs", status: "connected", color: C.purple, icon: <Zap className="w-5 h-5" /> },
    { name: "REST API Gateway", desc: "External system HTTP API connections", status: "disconnected", color: C.slate, icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-5">
      <GlassCard className="p-5">
        <SectionHeader title="System Integrations" desc="Manage connections to external platforms and protocols" />
        <div className="grid sm:grid-cols-2 gap-3">
          {INTEGRATIONS.map((integration) => (
            <div key={integration.name} className="p-4 rounded-xl flex items-start gap-3 group cursor-pointer transition-all hover:scale-[1.02]"
              style={{
                background: integration.status === "connected" ? `${integration.color}08` : "rgba(255,255,255,0.03)",
                border: `1px solid ${integration.status === "connected" ? integration.color + "22" : "rgba(255,255,255,0.06)"}`,
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${integration.color}20`, color: integration.color }}>
                {integration.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{integration.name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: integration.status === "connected" ? C.emerald : "#475569" }} />
                    <span className="text-[10px] capitalize" style={{ color: integration.status === "connected" ? C.emerald : "#475569" }}>
                      {integration.status}
                    </span>
                  </div>
                </div>
                <p className="text-[10px]" style={{ color: "#475569" }}>{integration.desc}</p>
                <button className="mt-2 text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all hover:opacity-80"
                  style={{ background: integration.status === "connected" ? `${C.red}15` : `${C.cyan}18`, border: `1px solid ${integration.status === "connected" ? C.red + "30" : C.cyan + "33"}`, color: integration.status === "connected" ? C.red : C.cyan }}>
                  {integration.status === "connected" ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <SectionHeader title="API Keys" desc="Manage API keys for programmatic SCADA access" />
        {[
          { name: "Production API Key", created: "Jan 10, 2026", lastUsed: "2 hours ago" },
          { name: "Read-Only Key (Monitoring)", created: "Mar 5, 2026", lastUsed: "5 min ago" },
        ].map((key) => (
          <div key={key.name} className="flex items-center justify-between gap-3 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${C.amber}15`, color: C.amber }}>
                <Key className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">{key.name}</p>
                <p className="text-[10px]" style={{ color: "#475569" }}>Created: {key.created} · Last used: {key.lastUsed}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-[10px] px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                style={{ background: `${C.cyan}15`, border: `1px solid ${C.cyan}30`, color: C.cyan }}>
                Reveal
              </button>
              <button className="text-[10px] px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                style={{ background: `${C.red}12`, border: `1px solid ${C.red}25`, color: C.red }}>
                Revoke
              </button>
            </div>
          </div>
        ))}
        <button className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
          style={{ background: `${C.cyan}18`, border: `1px solid ${C.cyan}33`, color: C.cyan }}>
          <Key className="w-3.5 h-3.5" />Generate New API Key
        </button>
      </GlassCard>
    </div>
  );
}

const TAB_COMPONENTS: Record<SettingsTab, React.ReactNode> = {
  profile: <ProfileTab />,
  notifications: <NotificationsTab />,
  security: <SecurityTab />,
  system: <SystemTab />,
  appearance: <AppearanceTab />,
  integrations: <IntegrationsTab />,
};

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className="max-w-[1200px] mx-auto space-y-5" style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
        <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>Manage your account, system, and SCADA configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tab sidebar */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="rounded-2xl p-2 space-y-1 sticky top-4"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}>
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
                style={{
                  background: activeTab === tab.id ? `${C.cyan}18` : "transparent",
                  border: `1px solid ${activeTab === tab.id ? C.cyan + "33" : "transparent"}`,
                  color: activeTab === tab.id ? C.cyan : "#64748b",
                }}>
                <span>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 min-w-0">
          {TAB_COMPONENTS[activeTab]}
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}
