import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from '@/components/ui/card';

// Sample forecast data (would come from API in real implementation)
const generateForecastData = () => {
  const hours = [];
  const now = new Date();
  now.setMinutes(0, 0, 0); // Round to current hour
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() + i);
    
    // Generate realistic noise patterns
    // Morning rush hour: 7-9am
    // Lunch time: 12-2pm
    // Evening rush hour: 5-7pm
    // Night time: lower levels
    
    const hour = time.getHours();
    let baseLevel = 40; // Baseline ambient noise
    
    // Rush hour patterns
    if (hour >= 7 && hour <= 9) {
      baseLevel += 30;
    } else if (hour >= 12 && hour <= 14) {
      baseLevel += 20;
    } else if (hour >= 17 && hour <= 19) {
      baseLevel += 25;
    } else if (hour >= 22 || hour <= 5) {
      baseLevel += 5;
    } else {
      baseLevel += 15;
    }
    
    // Add some randomness
    const trafficNoise = baseLevel + Math.random() * 10;
    const constructionNoise = hour >= 8 && hour <= 18 ? 
      baseLevel - 10 + Math.random() * 20 : 
      0;
    const socialNoise = hour >= 18 && hour <= 23 ? 
      baseLevel - 15 + Math.random() * 25 : 
      hour >= 12 && hour <= 14 ? baseLevel - 20 + Math.random() * 15 : 0;
    
    hours.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', hour12: true }),
      traffic: Math.round(trafficNoise),
      construction: Math.round(constructionNoise),
      social: Math.round(socialNoise),
      total: Math.round(Math.max(trafficNoise, constructionNoise, socialNoise) + 5 * Math.random())
    });
  }
  
  return hours;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="custom-tooltip">
        <p className="font-medium">{label}</p>
        <div className="mt-1">
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs">
                {entry.name}: {entry.value} dB
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const getNoiseLevelColor = (value) => {
  if (value < 45) return '#4ade80'; // green
  if (value < 65) return '#facc15'; // yellow
  if (value < 80) return '#f97316'; // orange
  return '#ef4444'; // red
};

const DailyPattern = ({ title, peakHours, description, icon }) => (
  <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
    <div className="flex items-center space-x-2 mb-2">
      <div className="text-2xl">{icon}</div>
      <h3 className="font-medium">{title}</h3>
    </div>
    <p className="text-sm text-gray-500 mb-1">Peak hours: {peakHours}</p>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);

const ForecastChart = () => {
  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    // In a real app, this would fetch forecast data from your API
    setData(generateForecastData());
  }, []);
  
  const averageNoiseLevel = data.length
    ? Math.round(data.reduce((sum, d) => sum + d.total, 0) / data.length)
    : 0;
    
  const peakNoiseLevel = data.length
    ? Math.max(...data.map(d => d.total))
    : 0;
    
  const quietestTime = data.length
    ? data.reduce((quietest, current) => 
        current.total < quietest.total ? current : quietest, data[0]).time
    : 'N/A';

  return (
    <div className="py-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Noise Forecast</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Average Noise Level</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold" style={{ color: getNoiseLevelColor(averageNoiseLevel) }}>
                {averageNoiseLevel}
              </span>
              <span className="text-lg ml-1 mb-1">dB</span>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Peak Noise Level</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold" style={{ color: getNoiseLevelColor(peakNoiseLevel) }}>
                {peakNoiseLevel}
              </span>
              <span className="text-lg ml-1 mb-1">dB</span>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Quietest Time</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-green-500">
                {quietestTime}
              </span>
            </div>
          </div>
        </div>
        
        <div className="h-80 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorConstruction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[30, 90]}
                label={{ 
                  value: 'Noise Level (dB)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: 12, fill: '#666' },
                  dy: 50
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
                iconSize={10}
              />
              <Area
                type="monotone"
                dataKey="traffic"
                name="Traffic"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorTraffic)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="construction"
                name="Construction"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#colorConstruction)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="social"
                name="Social"
                stroke="#4ade80"
                fillOpacity={1}
                fill="url(#colorSocial)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorTotal)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <h3 className="font-semibold text-lg mb-3">Daily Noise Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DailyPattern
            title="Morning Rush Hour"
            peakHours="7:00 AM - 9:00 AM"
            description="Increased traffic noise as people commute to work and school."
            icon="🚗"
          />
          <DailyPattern
            title="Construction Activity"
            peakHours="9:00 AM - 5:00 PM"
            description="Construction sites are most active during business hours."
            icon="🏗️"
          />
          <DailyPattern
            title="Evening Social Noise"
            peakHours="6:00 PM - 10:00 PM"
            description="Restaurants, bars, and social gatherings create evening noise peaks."
            icon="🍽️"
          />
        </div>
      </Card>
    </div>
  );
};

export default ForecastChart;