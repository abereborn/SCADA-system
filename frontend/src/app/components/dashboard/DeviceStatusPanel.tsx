import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const devices = [
  { id: 1, name: 'Pump A-1', status: 'active' as const, uptime: '98.5%' },
  { id: 2, name: 'Sensor T-12', status: 'active' as const, uptime: '99.2%' },
  { id: 3, name: 'Valve V-3', status: 'inactive' as const, uptime: '0%' },
  { id: 4, name: 'Controller C-4', status: 'active' as const, uptime: '97.8%' },
  { id: 5, name: 'Motor M-2', status: 'error' as const, uptime: '45.3%' },
  { id: 6, name: 'Sensor P-8', status: 'active' as const, uptime: '99.9%' },
  { id: 7, name: 'Pump B-2', status: 'active' as const, uptime: '96.7%' },
  { id: 8, name: 'Valve V-9', status: 'active' as const, uptime: '98.1%' }
];

export function DeviceStatusPanel() {
  const activeCount = devices.filter(d => d.status === 'active').length;
  const errorCount = devices.filter(d => d.status === 'error').length;
  const inactiveCount = devices.filter(d => d.status === 'inactive').length;

  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-6 h-full">
      <h2 className="text-xl text-white mb-4">Device Status</h2>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg p-2 text-center">
          <div className="text-2xl text-[#10b981]">{activeCount}</div>
          <div className="text-xs text-gray-400">Active</div>
        </div>
        <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg p-2 text-center">
          <div className="text-2xl text-[#ef4444]">{errorCount}</div>
          <div className="text-xs text-gray-400">Error</div>
        </div>
        <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-2 text-center">
          <div className="text-2xl text-gray-400">{inactiveCount}</div>
          <div className="text-xs text-gray-400">Inactive</div>
        </div>
      </div>

      {/* Device List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {devices.map((device) => (
          <DeviceItem key={device.id} {...device} />
        ))}
      </div>
    </div>
  );
}

function DeviceItem({ name, status, uptime }: { name: string; status: 'active' | 'inactive' | 'error'; uptime: string }) {
  const statusConfig = {
    active: {
      icon: <CheckCircle2 className="size-4" />,
      color: 'text-[#10b981]',
      bg: 'bg-[#10b981]/10'
    },
    inactive: {
      icon: <XCircle className="size-4" />,
      color: 'text-gray-400',
      bg: 'bg-gray-500/10'
    },
    error: {
      icon: <AlertCircle className="size-4" />,
      color: 'text-[#ef4444]',
      bg: 'bg-[#ef4444]/10'
    }
  };

  const { icon, color, bg } = statusConfig[status];

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className={`${color} ${bg} p-1.5 rounded`}>{icon}</div>
        <span className="text-white text-sm truncate">{name}</span>
      </div>
      <span className="text-gray-400 text-xs ml-2">{uptime}</span>
    </div>
  );
}
