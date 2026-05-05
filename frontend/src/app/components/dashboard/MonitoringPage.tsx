import {
  Gauge,
  Zap,
  Droplet,
  ThermometerSun
} from 'lucide-react';
import { RealTimeCharts } from './RealTimeCharts';
import { DeviceStatusPanel } from './DeviceStatusPanel';
import { AlertPanel } from './AlertPanel';
import { SCADAVisualization } from './SCADAVisualization';
import { MetricCard } from './MetricCard';

export function MonitoringPage() {
  return (
    <div className="max-w-[1800px] mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold tracking-tight">System Monitoring</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">System Online</span>
        </div>
      </div>

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
  );
}
