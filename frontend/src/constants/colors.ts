export const C = {
  cyan: "#22d3ee",
  blue: "#38bdf8",
  emerald: "#34d399",
  amber: "#fbbf24",
  red: "#f87171",
  purple: "#a78bfa",
  slate: "#94a3b8",
} as const;

export type ColorKey = keyof typeof C;

export function darkTheme(isDark: boolean) {
  return {
    textPrimary: isDark ? "#ffffff" : "#0f172a",
    textSec: isDark ? "#64748b" : "#94a3b8",
    textMuted: isDark ? "#475569" : "#94a3b8",
    cardBg: isDark
      ? "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))"
      : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    cardShadow: isDark
      ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)"
      : "0 4px 20px rgba(0,0,0,0.07)",
    divider: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
    barTrack: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
    pillBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    pillBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    inputBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    inputBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    inputColor: isDark ? "#ffffff" : "#0f172a",
    miniCellBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    rowHover: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    badgeBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    gridStroke: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
    axisTick: isDark ? "#475569" : "#94a3b8",
    tooltipBg: isDark ? "#0d1117" : "#ffffff",
    tooltipBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
  };
}
