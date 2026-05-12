import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { User, Edit, Settings, KeyRound, LogOut } from "lucide-react";
import { C } from "../../../constants/colors";

interface ProfileDropdownProps {
  onClose: () => void;
  isDark: boolean;
}

const MENU_ITEMS = [
  { icon: <User className="w-4 h-4" />, label: "View Profile" },
  { icon: <Edit className="w-4 h-4" />, label: "Edit Profile" },
  { icon: <Settings className="w-4 h-4" />, label: "Account Settings" },
  { icon: <KeyRound className="w-4 h-4" />, label: "Change Password" },
];

export function ProfileDropdown({ onClose, isDark }: ProfileDropdownProps) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

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
        boxShadow: isDark
          ? "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 8px 40px rgba(0,0,0,0.15)",
        zIndex: 9999,
      }}
    >
      <div className="p-3" style={{ borderBottom: `1px solid ${divider}` }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ background: `${C.cyan}22`, color: C.cyan, border: `1px solid ${C.cyan}44` }}
          >
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
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
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
