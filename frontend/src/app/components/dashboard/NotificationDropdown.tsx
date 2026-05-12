import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { C } from "../../../constants/colors";

interface Notification {
  id: number;
  severity: "critical" | "warning" | "info";
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, severity: "critical", title: "High Temperature Detected", desc: "Reactor B temp exceeded 90°C threshold", time: "2 min ago", read: false },
  { id: 2, severity: "warning", title: "Device Disconnected", desc: "Sensor T-12 lost connection unexpectedly", time: "8 min ago", read: false },
  { id: 3, severity: "info", title: "Maintenance Scheduled", desc: "Pump A-1 routine maintenance due in 3 days", time: "1 hr ago", read: true },
  { id: 4, severity: "info", title: "Backup System Activated", desc: "Secondary power source engaged automatically", time: "2 hrs ago", read: true },
  { id: 5, severity: "info", title: "New Report Generated", desc: "Monthly telemetry report is ready to view", time: "3 hrs ago", read: true },
];

const SEV_COLOR: Record<string, string> = {
  critical: C.red,
  warning: C.amber,
  info: C.blue,
};

const SEV_ICON: Record<string, React.ReactNode> = {
  critical: <AlertTriangle className="w-3.5 h-3.5" />,
  warning: <AlertTriangle className="w-3.5 h-3.5" />,
  info: <Info className="w-3.5 h-3.5" />,
};

interface NotificationDropdownProps {
  onClose: () => void;
  isDark: boolean;
}

export function NotificationDropdown({ onClose, isDark }: NotificationDropdownProps) {
  const [notes, setNotes] = useState(INITIAL_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notes.filter((n) => !n.read).length;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const dropBg = isDark
    ? "linear-gradient(135deg, rgba(10,14,39,0.99) 0%, rgba(8,12,30,0.99) 100%)"
    : "linear-gradient(135deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.99) 100%)";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const divider = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const itemHover = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
      style={{
        background: dropBg,
        border: `1px solid ${border}`,
        backdropFilter: "blur(24px)",
        boxShadow: isDark
          ? "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 8px 40px rgba(0,0,0,0.15)",
        zIndex: 9999,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${divider}` }}
      >
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
          <button
            className="text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all hover:opacity-80"
            style={{ color: C.cyan }}
            onClick={() => setNotes((n) => n.map((x) => ({ ...x, read: true })))}
          >
            Mark all read
          </button>
        )}
      </div>

      <div
        className="max-h-80 overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            className="px-4 py-3 cursor-pointer transition-all"
            style={{ borderBottom: `1px solid ${divider}`, opacity: note.read ? 0.6 : 1 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = itemHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() =>
              setNotes((n) => n.map((x) => (x.id === note.id ? { ...x, read: true } : x)))
            }
          >
            <div className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: `${SEV_COLOR[note.severity]}20`,
                  color: SEV_COLOR[note.severity],
                }}
              >
                {SEV_ICON[note.severity]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold truncate" style={{ color: textPrimary }}>
                    {note.title}
                  </p>
                  {!note.read && (
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: C.cyan }}
                    />
                  )}
                </div>
                <p
                  className="text-[10px] mt-0.5 line-clamp-1"
                  style={{ color: isDark ? "#94a3b8" : "#64748b" }}
                >
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
        <button
          className="w-full py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
          style={{ color: C.cyan }}
          onClick={onClose}
        >
          View all notifications
        </button>
      </div>
    </div>
  );
}
