import { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  HardDrive,
  Bell,
  FileText,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  ChevronLeft,
  Gauge,
  Zap,
  Droplet,
  ThermometerSun
} from 'lucide-react';
import { RealTimeCharts } from './dashboard/RealTimeCharts';
import { DeviceStatusPanel } from './dashboard/DeviceStatusPanel';
import { AlertPanel } from './dashboard/AlertPanel';
import { SCADAVisualization } from './dashboard/SCADAVisualization';
import { MetricCard } from './dashboard/MetricCard';

export function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-[#0a0e27]">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col bg-[#0f172a] border-r border-white/10 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <SidebarContent sidebarOpen={sidebarOpen} />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
        >
          <ChevronLeft className={`size-5 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-[#0f172a] border-r border-white/10 z-50 flex flex-col">
            <SidebarContent sidebarOpen={true} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-4 border-t border-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
            >
              <X className="size-5" />
            </button>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-[#0f172a] border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors"
              >
                <Menu className="size-6" />
              </button>
              <div className="flex items-center gap-2">
                <Activity className="size-6 text-[#0ea5e9]" />
                <h1 className="text-xl text-white hidden sm:block">SCADA Control Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* System Status */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30">
                <div className="size-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-sm text-[#10b981]">Online</span>
              </div>
              {/* Notifications */}
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <Bell className="size-5" />
                <span className="absolute -top-1 -right-1 size-4 rounded-full bg-[#ef4444] text-white text-xs flex items-center justify-center">3</span>
              </button>
              {/* User Profile */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <div className="size-8 rounded-full bg-[#0ea5e9] flex items-center justify-center">
                  <User className="size-4 text-white" />
                </div>
                <span className="text-white hidden md:block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-[1800px] mx-auto space-y-6">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                icon={<ThermometerSun className="size-6" />}
                title="Temperature"
                value="72.5"
                unit="°C"
                status="normal"
                trend="+2.1%"
              />
              <MetricCard
                icon={<Gauge className="size-6" />}
                title="Pressure"
                value="1.8"
                unit="bar"
                status="normal"
                trend="-0.5%"
              />
              <MetricCard
                icon={<Droplet className="size-6" />}
                title="Flow Rate"
                value="245"
                unit="L/min"
                status="warning"
                trend="+5.2%"
              />
              <MetricCard
                icon={<Zap className="size-6" />}
                title="Voltage"
                value="380"
                unit="V"
                status="normal"
                trend="0%"
              />
            </div>

            {/* Charts and Alerts Row */}
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <RealTimeCharts />
              </div>
              <div>
                <AlertPanel />
              </div>
            </div>

            {/* SCADA Visualization and Device Status */}
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SCADAVisualization />
              </div>
              <div>
                <DeviceStatusPanel />
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden border-t border-white/10 bg-[#0f172a] px-4 py-2">
          <div className="flex justify-around">
            <MobileNavItem icon={<LayoutDashboard className="size-5" />} label="Dashboard" active />
            <MobileNavItem icon={<Activity className="size-5" />} label="Monitor" />
            <MobileNavItem icon={<Bell className="size-5" />} label="Alerts" />
            <MobileNavItem icon={<Settings className="size-5" />} label="Settings" />
          </div>
        </nav>
      </div>
    </div>
  );
}

function SidebarContent({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Activity className="size-8 text-[#0ea5e9] flex-shrink-0" />
          {sidebarOpen && <span className="text-xl text-white">SCADA</span>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem icon={<LayoutDashboard className="size-5" />} label="Dashboard" active sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<Activity className="size-5" />} label="Monitoring" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<HardDrive className="size-5" />} label="Devices" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<Bell className="size-5" />} label="Alerts" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<FileText className="size-5" />} label="Reports" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<Settings className="size-5" />} label="Settings" sidebarOpen={sidebarOpen} />
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <LogOut className="size-5 flex-shrink-0" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </>
  );
}

function SidebarItem({ icon, label, active, sidebarOpen }: { icon: React.ReactNode; label: string; active?: boolean; sidebarOpen: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-[#0ea5e9] text-white'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}>
      <div className="flex-shrink-0">{icon}</div>
      {sidebarOpen && <span>{label}</span>}
    </button>
  );
}

function MobileNavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 px-3 py-2 ${
      active ? 'text-[#0ea5e9]' : 'text-gray-400'
    }`}>
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
