import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar, Filter, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockChartData = [
  { time: '00:00', temp: 42, pressure: 1.2, flow: 210 },
  { time: '04:00', temp: 45, pressure: 1.4, flow: 230 },
  { time: '08:00', temp: 58, pressure: 1.8, flow: 250 },
  { time: '12:00', temp: 65, pressure: 2.1, flow: 280 },
  { time: '16:00', temp: 62, pressure: 1.9, flow: 260 },
  { time: '20:00', temp: 50, pressure: 1.5, flow: 220 },
  { time: '24:00', temp: 44, pressure: 1.3, flow: 215 },
];

export function ReportsPage() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [metric, setMetric] = useState<'temp' | 'pressure' | 'flow'>('temp');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
alert(`Successfully exported report as ${format.toUpperCase()}`);
    }, 1500);
  };

  const getMetricColor = () => {
    switch(metric) {
      case 'temp': return '#ef4444';
      case 'pressure': return '#0ea5e9';
      case 'flow': return '#10b981';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Reports</h2>
          <p className="text-muted-foreground">Generate, view, and export historical telemetry data.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground hover:bg-accent transition-colors rounded-md font-medium text-sm disabled:opacity-50"
          >
            <FileSpreadsheet className="h-4 w-4" />
            CSV
          </button>
          <button 
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-md font-medium text-sm disabled:opacity-50 shadow-sm"
          >
            {isExporting ? <span className="animate-spin">⌛</span> : <FileText className="h-4 w-4" />}
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Date Range</label>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md border border-border">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select className="bg-transparent border-none outline-none text-sm w-full text-foreground cursor-pointer appearance-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Custom Range...</option>
            </select>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Device Filter</label>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md border border-border">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select className="bg-transparent border-none outline-none text-sm w-full text-foreground cursor-pointer appearance-none">
              <option>All Devices</option>
              <option>Main Pump Station A</option>
              <option>Cooling Tower B</option>
              <option>Primary Generator</option>
            </select>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Metric</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setMetric('temp')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${metric === 'temp' ? 'bg-rose-500 text-white shadow-sm' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
            >
              Temp
            </button>
            <button 
              onClick={() => setMetric('pressure')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${metric === 'pressure' ? 'bg-sky-500 text-white shadow-sm' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
            >
              Pressure
            </button>
            <button 
              onClick={() => setMetric('flow')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${metric === 'flow' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
            >
              Flow
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Historical Data View
          </h3>
          <div className="flex bg-muted p-1 rounded-md">
            <button 
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded-sm transition-colors ${chartType === 'line' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LineChartIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-sm transition-colors ${chartType === 'bar' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={metric} 
                  stroke={getMetricColor()} 
                  strokeWidth={3}
                  dot={{ r: 4, fill: getMetricColor(), strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                />
              </LineChart>
            ) : (
              <BarChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  cursor={{ fill: 'var(--color-accent)' }}
                />
                <Legend />
                <Bar 
                  dataKey={metric} 
                  fill={getMetricColor()} 
                  radius={[4, 4, 0, 0]}
                  name={metric.charAt(0).toUpperCase() + metric.slice(1)}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
