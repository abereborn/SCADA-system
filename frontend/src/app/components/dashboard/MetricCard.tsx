import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: string;
}

export function MetricCard({ icon, title, value, unit, status, trend }: MetricCardProps) {
  const statusColors = {
    normal: 'border-[#10b981]/30 bg-[#10b981]/5',
    warning: 'border-[#f59e0b]/30 bg-[#f59e0b]/5',
    critical: 'border-[#ef4444]/30 bg-[#ef4444]/5'
  };

  const statusDotColors = {
    normal: 'bg-[#10b981]',
    warning: 'bg-[#f59e0b]',
    critical: 'bg-[#ef4444]'
  };

  const isPositive = trend.startsWith('+');
  const isNegative = trend.startsWith('-');

  return (
    <div className={`bg-[#111827] border rounded-xl p-4 ${statusColors[status]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-[#0ea5e9]/10 text-[#0ea5e9]">
          {icon}
        </div>
        <div className={`size-2 rounded-full ${statusDotColors[status]} animate-pulse`} />
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl text-white">{value}</span>
        <span className="text-gray-400">{unit}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        {isPositive && <TrendingUp className="size-4 text-[#10b981]" />}
        {isNegative && <TrendingDown className="size-4 text-[#ef4444]" />}
        <span className={`${
          isPositive ? 'text-[#10b981]' : isNegative ? 'text-[#ef4444]' : 'text-gray-400'
        }`}>
          {trend}
        </span>
        <span className="text-gray-500">from last hour</span>
      </div>
    </div>
  );
}
