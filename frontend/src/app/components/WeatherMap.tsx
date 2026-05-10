import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock data based on BMKG for Indonesia regions
const mockRegions = [
  { id: 1, name: "Jakarta", lat: -6.2088, lng: 106.8456, temp: 33, rainfall: 15, humidity: 75, condition: "Partly Cloudy" },
  { id: 2, name: "Surabaya", lat: -7.2504, lng: 112.7688, temp: 35, rainfall: 5, humidity: 65, condition: "Sunny" },
  { id: 3, name: "Bandung", lat: -6.9175, lng: 107.6191, temp: 24, rainfall: 60, humidity: 85, condition: "Heavy Rain" },
  { id: 4, name: "Medan", lat: 3.5952, lng: 98.6722, temp: 31, rainfall: 25, humidity: 80, condition: "Light Rain" },
  { id: 5, name: "Makassar", lat: -5.1477, lng: 119.4327, temp: 32, rainfall: 10, humidity: 70, condition: "Cloudy" },
  { id: 6, name: "Balikpapan", lat: -1.2379, lng: 116.8529, temp: 29, rainfall: 45, humidity: 88, condition: "Rain" },
  { id: 7, name: "Jayapura", lat: -2.5337, lng: 140.7181, temp: 30, rainfall: 30, humidity: 82, condition: "Light Rain" },
  { id: 8, name: "Denpasar", lat: -8.65, lng: 115.2167, temp: 31, rainfall: 0, humidity: 75, condition: "Clear" },
  { id: 9, name: "Palembang", lat: -2.9761, lng: 104.7754, temp: 33, rainfall: 55, humidity: 80, condition: "Heavy Rain" },
  { id: 10, name: "Semarang", lat: -6.9667, lng: 110.4167, temp: 34, rainfall: 5, humidity: 70, condition: "Sunny" },
];

function getColor(rainfall: number, temp: number) {
  if (rainfall > 50) return "#1e3a8a"; // dark blue - Heavy rain
  if (rainfall > 20) return "#3b82f6"; // blue - Light rain
  if (temp > 32) return "#ef4444"; // red - Hot
  return "#10b981"; // green - Normal
}

function MapUpdater({ activeRegion }: { activeRegion: any }) {
  const map = useMap();
  useEffect(() => {
    if (activeRegion) {
      map.flyTo([activeRegion.lat, activeRegion.lng], 8, {
        duration: 1.5,
      });
    } else {
      map.flyTo([-0.7893, 113.9213], 5, {
        duration: 1.5,
      });
    }
  }, [activeRegion, map]);
  return null;
}

export function WeatherMap() {
  const [activeRegion, setActiveRegion] = useState<any>(null);
  const [data, setData] = useState(mockRegions);

  // This state is used to trigger re-render for simulating the pulse effect on heavy rain regions
  const [interactive, setInteractive] = useState(false);

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((region) => ({
          ...region,
          temp: region.temp + (Math.random() * 2 - 1),
          rainfall: Math.max(0, region.rainfall + (Math.random() * 10 - 5)),
        })),
      );
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-lg z-0 bg-card" onClick={() => setInteractive(true)}>
      <MapContainer
        center={[-2.5, 118]}
        zoom={5}
        minZoom={5}
        maxZoom={10}
        bounds={[
          [-11, 95],
          [6, 141],
        ]}
        maxBounds={[
          [-11, 95],
          [6, 141],
        ]}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true} />

        {data.map((region) => {
          const color = getColor(region.rainfall, region.temp);
          return (
            <CircleMarker
              key={region.id}
              center={[region.lat, region.lng]}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.7,
                color: color,
                weight: 2,
              }}
              radius={12 + (region.rainfall > 30 ? 6 : 0)} // pulse effect logic simulated by size
              eventHandlers={{
                click: () => setActiveRegion(region),
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.9,
                    weight: 4,
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 2,
                  });
                },
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[150px]">
                  <h3 className="font-bold text-lg border-b border-gray-200 pb-1 mb-2 text-gray-800">{region.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex justify-between">
                      <span>Rainfall:</span> <span className="font-medium">{region.rainfall.toFixed(1)} mm</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Temperature:</span> <span className="font-medium">{region.temp.toFixed(1)} °C</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Humidity:</span> <span className="font-medium">{region.humidity}%</span>
                    </p>
                    <p className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                      <span>Condition:</span> <span className="font-medium text-blue-600">{region.condition}</span>
                    </p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        <MapUpdater activeRegion={activeRegion} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-md">
        <h4 className="text-sm font-semibold mb-2">Weather Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1e3a8a]"></div>
            <span>Heavy Rain (&gt;50mm)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
            <span>Light Rain (&gt;20mm)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
            <span>Hot (&gt;32°C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span>Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
