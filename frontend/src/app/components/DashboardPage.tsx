import { useState } from "react";
import { Outlet } from "react-router";
import { useTheme } from "./ThemeProvider";
import { Sidebar } from "./dashboard/Sidebar";
import { Topbar } from "./dashboard/Topbar";
import { C } from "../../constants/colors";

export function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const pageBg = isDark
    ? "radial-gradient(ellipse at top left, #0a0e2788 0%, #060810 60%), #060810"
    : "radial-gradient(ellipse at top left, #dbeafe 0%, #f8fafc 60%), #f0f6ff";

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{ background: pageBg, fontFamily: "'DM Sans', -apple-system, sans-serif" }}
    >
      {/* Ambient glow layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.05]"
          style={{ background: C.cyan, filter: "blur(100px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.03]"
          style={{ background: C.purple, filter: "blur(80px)" }}
        />
      </div>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        isDark={isDark}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0">
        <Topbar onMenuOpen={() => setSidebarOpen(true)} />

        <main
          className="flex-1 overflow-y-auto p-4 lg:p-6"
          style={{ scrollbarWidth: "thin", scrollbarColor: isDark ? "#1e293b transparent" : "#cbd5e1 transparent" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
