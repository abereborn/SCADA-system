import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function RealTimeCharts() {
  const [data, setData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastTime = prevData[prevData.length - 1].time;
        newData.push({
          time: lastTime + 1,
          temperature: 70 + Math.random() * 10,
          pressure: 1.5 + Math.random() * 0.6,
          flowRate: 230 + Math.random() * 30,
          voltage: 375 + Math.random() * 10
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-white">Real-Time Monitoring</h2>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fill: '#9ca3af' }}
              tickFormatter={(value) => `${value}s`}
            />
            <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend wrapperStyle={{ color: '#9ca3af' }} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={false}
              name="Temperature (°C)"
            />
            <Line
              type="monotone"
              dataKey="pressure"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
              name="Pressure (bar)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function generateInitialData() {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: i,
      temperature: 70 + Math.random() * 10,
      pressure: 1.5 + Math.random() * 0.6,
      flowRate: 230 + Math.random() * 30,
      voltage: 375 + Math.random() * 10
    });
  }
  return data;
}
