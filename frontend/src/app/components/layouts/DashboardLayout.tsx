import { Outlet, NavLink, useNavigate } from "react-router";
import { useTheme } from "../ThemeProvider";
import { Activity, Server, Bell, FileText, ShieldAlert, LogOut, Settings, ChevronLeft, ChevronRight, Sun, Moon, Menu, LineChart, HardDrive, Cpu, Zap, Clock, Database } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const navItems = [
    { name: "Monitoring", to: "/dashboard", icon: <Activity className="w-5 h-5" /> },
    { name: "Devices", to: "/dashboard/devices", icon: <Server className="w-5 h-5" /> },
    { name: "Alerts", to: "/dashboard/alerts", icon: <Bell className="w-5 h-5" /> },
    { name: "Reports", to: "/dashboard/reports", icon: <FileText className="w-5 h-5" /> },
  ];

  const advancedItems = [
    { name: "Analytics", icon: <LineChart className="w-5 h-5" /> },
    { name: "Logs", icon: <Database className="w-5 h-5" /> },
    { name: "Automation", icon: <Zap className="w-5 h-5" /> },
    { name: "Integrations", icon: <Cpu className="w-5 h-5" /> },
    { name: "Network", icon: <HardDrive className="w-5 h-5" /> },
    { name: "Historical", icon: <Clock className="w-5 h-5" /> },
  ];

  const adminItems = [{ name: "Master Admin", to: "/dashboard/admin", icon: <ShieldAlert className="w-5 h-5" /> }];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside style={{ width: collapsed ? 80 : 280 }} className="flex flex-col border-r border-border bg-card relative z-20 transition-all duration-300 h-full shrink-0">
        <div className="flex items-center justify-between p-4 h-16 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Activity className="w-6 h-6" />
              <span>SCADA</span>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center text-primary">
              <Activity className="w-6 h-6" />
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground absolute -right-4 top-5 bg-card border border-border hidden md:flex">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-6 scrollbar-thin scrollbar-thumb-border">
          <div className="space-y-1">
            {!collapsed && <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Main</p>}
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${isActive ? "bg-primary text-primary-foreground font-medium shadow-sm" : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"}`
                }
                title={collapsed ? item.name : undefined}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </div>

          <div className="space-y-1">
            {!collapsed && <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Advanced</p>}
            {advancedItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-foreground/50 hover:bg-accent hover:text-accent-foreground cursor-not-allowed opacity-70"
                title={collapsed ? item.name + " (Coming Soon)" : undefined}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {!collapsed && <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Admin</p>}
            {adminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${isActive ? "bg-primary text-primary-foreground font-medium shadow-sm" : "text-destructive hover:bg-destructive/10"}`}
                title={collapsed ? item.name : undefined}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-border mt-auto sticky bottom-0 bg-card">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-foreground/80 hover:bg-accent hover:text-accent-foreground mb-1" title={collapsed ? "Settings" : undefined}>
            <Settings className="w-5 h-5" />
            {!collapsed && <span>Settings</span>}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-foreground/80 hover:bg-accent hover:text-accent-foreground" title={collapsed ? "Logout" : undefined}>
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-muted/30">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-lg hidden sm:block">Control Center</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-1 border border-border rounded-full bg-background/50">
              <button onClick={() => setTheme("light")} className={`p-1.5 rounded-full transition-colors ${theme === "light" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"}`}>
                <Sun className="w-4 h-4" />
              </button>
              <button onClick={() => setTheme("dark")} className={`p-1.5 rounded-full transition-colors ${theme === "dark" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"}`}>
                <Moon className="w-4 h-4" />
              </button>
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 outline-none">
                  <Avatar.Root className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/20">
                    <Avatar.Image className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" alt="User avatar" />
                    <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-medium rounded-full">AD</Avatar.Fallback>
                  </Avatar.Root>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[200px] bg-popover text-popover-foreground rounded-md p-1 shadow-md border border-border z-50 animate-in fade-in zoom-in-95" sideOffset={5} align="end">
                  <DropdownMenu.Label className="px-3 py-2 text-sm font-semibold">My Account</DropdownMenu.Label>
                  <DropdownMenu.Separator className="h-px bg-border my-1" />
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground outline-none">Edit Profile</DropdownMenu.Item>
                  <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground outline-none">Change Password</DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-px bg-border my-1" />
                  <DropdownMenu.Item onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground outline-none">
                    Toggle Theme
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-px bg-border my-1" />
                  <DropdownMenu.Item onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer text-destructive hover:bg-destructive/10 outline-none font-medium">
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
