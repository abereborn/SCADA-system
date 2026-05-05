import { useState, useEffect } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Clock, Filter } from 'lucide-react';

type Alert = {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  source: string;
  timestamp: Date;
  resolved: boolean;
};

const INITIAL_ALERTS: Alert[] = [
  { id: 'ALT-001', severity: 'critical', message: 'Main Pump Station A pressure drop detected', source: 'Pump A', timestamp: new Date(Date.now() - 1000 * 60 * 5), resolved: false },
  { id: 'ALT-002', severity: 'warning', message: 'Cooling Tower B temperature above normal', source: 'Cooling B', timestamp: new Date(Date.now() - 1000 * 60 * 15), resolved: false },
  { id: 'ALT-003', severity: 'info', message: 'Scheduled maintenance reminder for Generator 1', source: 'System', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), resolved: true },
  { id: 'ALT-004', severity: 'critical', message: 'Backup Generator failed to start during test', source: 'Generator 2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), resolved: true },
];

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  // Simulate incoming alerts
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert: Alert = {
          id: `ALT-00 ${alerts.length + 1}`,
          severity: Math.random() > 0.8 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
          message: 'Anomaly detected in flow rate sensor',
          source: `Sensor ${Math.floor(Math.random() * 10) + 1}`,
          timestamp: new Date(),
          resolved: false,
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 15000); // Check every 15s
    
    return () => clearInterval(timer);
  }, [alerts.length]);

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'active') return !a.resolved;
    if (filter === 'resolved') return a.resolved;
    return true;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="h-5 w-5 text-rose-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      default: return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSeverityBg = (severity: string, resolved: boolean) => {
    if (resolved) return 'bg-card border-border opacity-60';
    switch (severity) {
      case 'critical': return 'bg-rose-500/10 border-rose-500/30';
      case 'warning': return 'bg-amber-500/10 border-amber-500/30';
      case 'info': return 'bg-blue-500/10 border-blue-500/30';
      default: return 'bg-card border-border';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Alerts</h2>
          <p className="text-muted-foreground">Monitor and manage operational anomalies and notifications.</p>
        </div>
        <div className="flex gap-2 bg-muted/50 p-1 rounded-lg border border-border">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'active' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('resolved')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'resolved' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-4 justify-between transition-all ${getSeverityBg(alert.severity, alert.resolved)}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getSeverityIcon(alert.severity)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      alert.severity === 'critical' ? 'bg-rose-500/20 text-rose-500' :
                      alert.severity === 'warning' ? 'bg-amber-500/20 text-amber-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-sm font-medium text-foreground">{alert.source}</span>
                  </div>
                  <p className={`text-base ${alert.resolved ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {alert.timestamp.toLocaleTimeString()} - {alert.timestamp.toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex sm:flex-col items-center sm:items-end justify-between mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50 gap-2">
                {!alert.resolved ? (
                  <button 
                    onClick={() => resolveAlert(alert.id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md transition-colors text-sm font-medium border border-emerald-500/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Resolve
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
        
        {filteredAlerts.length === 0 && (
          <div className="text-center p-12 bg-card border border-border rounded-xl">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground">All Clear</h3>
            <p className="text-muted-foreground mt-1">No alerts found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
