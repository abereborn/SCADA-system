import { useEffect, useState } from 'react';

export function SCADAVisualization() {
  const [flowActive, setFlowActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowActive(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-white">System Overview</h2>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-[#10b981]" />
            <span className="text-gray-400">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-[#f59e0b]" />
            <span className="text-gray-400">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-[#ef4444]" />
            <span className="text-gray-400">Critical</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0e27] rounded-lg p-8 min-h-[400px] relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />

        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
          {/* Tank A (Left) */}
          <g>
            <rect x="50" y="100" width="100" height="150" fill="none" stroke="#0ea5e9" strokeWidth="2" />
            <rect x="50" y="180" width="100" height="70" fill="#0ea5e9" fillOpacity="0.3">
              <animate attributeName="height" values="70;90;70" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y" values="180;160;180" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="100" y="90" textAnchor="middle" fill="#0ea5e9" fontSize="14">Tank A</text>
            {/* Status Indicator */}
            <circle cx="135" cy="115" r="5" fill="#10b981">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Temperature Sensor */}
            <circle cx="100" cy="200" r="8" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <text x="100" y="205" textAnchor="middle" fill="#06b6d4" fontSize="10">T</text>
          </g>

          {/* Pipe from Tank A to Pump */}
          <line x1="150" y1="175" x2="240" y2="175" stroke="#0ea5e9" strokeWidth="3" />
          {flowActive && (
            <>
              <circle cx="170" cy="175" r="3" fill="#06b6d4">
                <animate attributeName="cx" from="150" to="240" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="175" r="3" fill="#06b6d4">
                <animate attributeName="cx" from="150" to="240" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Pump */}
          <g>
            <circle cx="260" cy="175" r="25" fill="none" stroke="#0ea5e9" strokeWidth="2" />
            <path d="M 260 155 L 270 175 L 260 195 L 250 175 Z" fill="#0ea5e9" fillOpacity="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 260 175"
                to="360 260 175"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
            <text x="260" y="220" textAnchor="middle" fill="#0ea5e9" fontSize="14">Pump</text>
            <circle cx="285" cy="160" r="5" fill="#10b981">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Pipe from Pump to Valve */}
          <line x1="285" y1="175" x2="370" y2="175" stroke="#0ea5e9" strokeWidth="3" />
          {flowActive && (
            <>
              <circle cx="300" cy="175" r="3" fill="#06b6d4">
                <animate attributeName="cx" from="285" to="370" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="175" r="3" fill="#06b6d4">
                <animate attributeName="cx" from="285" to="370" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Valve */}
          <g>
            <path d="M 390 165 L 410 165 L 400 185 Z" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <line x1="400" y1="165" x2="400" y2="140" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="400" cy="135" r="5" fill="#f59e0b" />
            <text x="400" y="200" textAnchor="middle" fill="#f59e0b" fontSize="14">Valve</text>
            <circle cx="415" cy="155" r="4" fill="#f59e0b">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Pipe from Valve to Reactor */}
          <line x1="410" y1="175" x2="480" y2="175" stroke="#0ea5e9" strokeWidth="3" />
          {flowActive && (
            <circle cx="430" cy="175" r="3" fill="#06b6d4">
              <animate attributeName="cx" from="410" to="480" dur="1.5s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Reactor */}
          <g>
            <ellipse cx="550" cy="120" rx="50" ry="20" fill="none" stroke="#ef4444" strokeWidth="2" />
            <line x1="500" y1="120" x2="500" y2="220" stroke="#ef4444" strokeWidth="2" />
            <line x1="600" y1="120" x2="600" y2="220" stroke="#ef4444" strokeWidth="2" />
            <ellipse cx="550" cy="220" rx="50" ry="20" fill="none" stroke="#ef4444" strokeWidth="2" />
            <rect x="500" y="160" width="100" height="40" fill="#ef4444" fillOpacity="0.2">
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="550" y="110" textAnchor="middle" fill="#ef4444" fontSize="14">Reactor B</text>
            <circle cx="605" cy="135" r="5" fill="#ef4444">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            </circle>
            {/* Pressure Sensor */}
            <circle cx="550" cy="170" r="8" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <text x="550" y="175" textAnchor="middle" fill="#06b6d4" fontSize="10">P</text>
          </g>

          {/* Outlet Pipe from Reactor to Tank B */}
          <line x1="600" y1="180" x2="650" y2="180" stroke="#0ea5e9" strokeWidth="3" />
          <line x1="650" y1="180" x2="650" y2="160" stroke="#0ea5e9" strokeWidth="3" />
          {flowActive && (
            <circle cx="620" cy="180" r="3" fill="#06b6d4">
              <animate attributeName="cx" from="600" to="650" dur="1.5s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Tank B (Right) */}
          <g>
            <rect x="650" y="100" width="100" height="150" fill="none" stroke="#0ea5e9" strokeWidth="2" />
            <rect x="650" y="190" width="100" height="60" fill="#0ea5e9" fillOpacity="0.3">
              <animate attributeName="height" values="60;80;60" dur="4s" repeatCount="indefinite" />
              <animate attributeName="y" values="190;170;190" dur="4s" repeatCount="indefinite" />
            </rect>
            <text x="700" y="90" textAnchor="middle" fill="#0ea5e9" fontSize="14">Tank B</text>
            <circle cx="735" cy="115" r="5" fill="#10b981">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Flow Sensor */}
            <circle cx="700" cy="220" r="8" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <text x="700" y="225" textAnchor="middle" fill="#06b6d4" fontSize="10">F</text>
          </g>

          {/* Control Labels */}
          <text x="400" y="340" textAnchor="middle" fill="#9ca3af" fontSize="12">Industrial Process Flow</text>
          <text x="400" y="360" textAnchor="middle" fill="#6b7280" fontSize="10">
            T: Temperature | P: Pressure | F: Flow Rate
          </text>
        </svg>
      </div>
    </div>
  );
}
