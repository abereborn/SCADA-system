import { useState } from 'react';
import { Search, Filter, HardDrive, CheckCircle2, AlertTriangle, XCircle, ChevronRight, Activity, Thermometer, Droplets } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const MOCK_DEVICES = [
  { id: 'DEV-001', name: 'Main Pump Station A', type: 'Pump', status: 'online', health: 98, uptime: '99.9%', lastMaintenance: '2026-04-15' },
  { id: 'DEV-002', name: 'Cooling Tower B', type: 'Cooling', status: 'warning', health: 75, uptime: '98.5%', lastMaintenance: '2026-03-20' },
  { id: 'DEV-003', name: 'Primary Generator', type: 'Power', status: 'online', health: 100, uptime: '100%', lastMaintenance: '2026-05-01' },
  { id: 'DEV-004', name: 'Backup Generator', type: 'Power', status: 'offline', health: 45, uptime: '85.2%', lastMaintenance: '2025-11-10' },
  { id: 'DEV-005', name: 'Water Filter Unit 1', type: 'Filter', status: 'online', health: 92, uptime: '99.1%', lastMaintenance: '2026-04-28' },
  { id: 'DEV-006', name: 'Pressure Valve C', type: 'Valve', status: 'warning', health: 68, uptime: '95.4%', lastMaintenance: '2026-02-14' },
  { id: 'DEV-007', name: 'Heat Exchanger', type: 'Exchanger', status: 'online', health: 89, uptime: '99.7%', lastMaintenance: '2026-04-10' },
];

export function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<typeof MOCK_DEVICES[0] | null>(null);

  const filteredDevices = MOCK_DEVICES.filter(dev => 
    dev.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dev.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Devices & Equipment</h2>
          <p className="text-muted-foreground">Manage and monitor all connected SCADA hardware.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search devices..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <button className="px-3 py-2 bg-card border border-border rounded-md hover:bg-accent transition-colors flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Device ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Health</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDevices.map(device => (
                <tr key={device.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">{device.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      {device.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{device.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {device.status === 'online' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      {device.status === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      {device.status === 'offline' && <XCircle className="h-4 w-4 text-rose-500" />}
                      <span className="capitalize">{device.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={\`h-full \${device.health > 80 ? 'bg-emerald-500' : device.health > 50 ? 'bg-amber-500' : 'bg-rose-500'}\`} 
                          style={{ width: \`\${device.health}%\` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{device.health}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedDevice(device)}
                      className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDevices.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No devices found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      <Dialog.Root open={!!selectedDevice} onOpenChange={(open) => !open && setSelectedDevice(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95vw] max-w-2xl bg-card border border-border shadow-xl rounded-xl p-0 z-50 overflow-hidden animate-in fade-in zoom-in-95">
            {selectedDevice && (
              <>
                <div className="p-6 border-b border-border flex justify-between items-start bg-muted/20">
                  <div>
                    <Dialog.Title className="text-2xl font-bold mb-1 flex items-center gap-2">
                      {selectedDevice.name}
                      {selectedDevice.status === 'online' && <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs border border-emerald-500/20 uppercase tracking-wider">Online</span>}
                      {selectedDevice.status === 'warning' && <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-xs border border-amber-500/20 uppercase tracking-wider">Warning</span>}
                      {selectedDevice.status === 'offline' && <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-xs border border-rose-500/20 uppercase tracking-wider">Offline</span>}
                    </Dialog.Title>
                    <Dialog.Description className="text-muted-foreground">
                      ID: {selectedDevice.id} | Type: {selectedDevice.type}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground">
                      <XCircle className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Device Health</h4>
                      <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Overall Status</p>
                            <p className="text-2xl font-bold">{selectedDevice.health}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Uptime</p>
                          <p className="text-xl font-medium">{selectedDevice.uptime}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Telemetry</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/30 p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Thermometer className="h-4 w-4" />
                            <span className="text-xs font-medium">Temp</span>
                          </div>
                          <p className="text-lg font-bold">42.5°C</p>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Droplets className="h-4 w-4" />
                            <span className="text-xs font-medium">Pressure</span>
                          </div>
                          <p className="text-lg font-bold">120 PSI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Maintenance</h4>
                      <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Last Serviced</span>
                          <span className="text-sm font-medium">{selectedDevice.lastMaintenance}</span>
                        </div>
                        <div className="w-full h-px bg-border" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Next Scheduled</span>
                          <span className="text-sm font-medium text-amber-500">In 14 days</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity">
                          Run Diagnostics
                        </button>
                        <button className="w-full py-2 px-4 bg-card border border-border text-foreground rounded-md font-medium hover:bg-accent transition-colors">
                          Schedule Maintenance
                        </button>
                        <button className="w-full py-2 px-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-md font-medium hover:bg-rose-500/20 transition-colors">
                          Emergency Shutdown
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
