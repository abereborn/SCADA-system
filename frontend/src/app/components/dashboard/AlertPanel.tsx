import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical' as const,
    message: 'High pressure detected in Tank A',
    time: '2 min ago',
    location: 'Sector 3'
  },
  {
    id: 2,
    type: 'warning' as const,
    message: 'Flow rate above normal threshold',
    time: '15 min ago',
    location: 'Sector 1'
  },
  {
    id: 3,
    type: 'critical' as const,
    message: 'Temperature spike in Reactor B',
    time: '23 min ago',
    location: 'Sector 2'
  },
  {
    id: 4,
    type: 'info' as const,
    message: 'Scheduled maintenance completed',
    time: '1 hour ago',
    location: 'Sector 4'
  },
  {
    id: 5,
    type: 'warning' as const,
    message: 'Voltage fluctuation detected',
    time: '2 hours ago',
    location: 'Sector 1'
  }
];

export function AlertPanel() {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-white">Active Alerts</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30">
          <AlertTriangle className="size-4 text-[#ef4444]" />
          <span className="text-sm text-[#ef4444]">3 Critical</span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <AlertItem key={alert.id} {...alert} />
        ))}
      </div>
    </div>
  );
}

function AlertItem({ type, message, time, location }: { type: 'critical' | 'warning' | 'info'; message: string; time: string; location: string }) {
  const config = {
    critical: {
      icon: <AlertTriangle className="size-5" />,
      bgColor: 'bg-[#ef4444]/10',
      borderColor: 'border-[#ef4444]/30',
      textColor: 'text-[#ef4444]',
      animate: true
    },
    warning: {
      icon: <AlertCircle className="size-5" />,
      bgColor: 'bg-[#f59e0b]/10',
      borderColor: 'border-[#f59e0b]/30',
      textColor: 'text-[#f59e0b]',
      animate: false
    },
    info: {
      icon: <Info className="size-5" />,
      bgColor: 'bg-[#0ea5e9]/10',
      borderColor: 'border-[#0ea5e9]/30',
      textColor: 'text-[#0ea5e9]',
      animate: false
    }
  };

  const { icon, bgColor, borderColor, textColor, animate } = config[type];

  return (
    <div className={`p-3 rounded-lg border ${bgColor} ${borderColor} ${animate ? 'animate-pulse' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={textColor}>{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm mb-1">{message}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {time}
            </span>
            <span>•</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
