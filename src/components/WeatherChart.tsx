import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { DailyForecastDay } from '../types';
import { getWeatherCodeInfo } from '../utils/weatherCodes';

interface WeatherChartProps {
  daily: DailyForecastDay[];
  unitTemp: string;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ daily, unitTemp }) => {
  const [chartMode, setChartMode] = useState<'temperature' | 'precipitation'>('temperature');

  const chartData = daily.map((day) => ({
    name: day.dayName,
    date: day.fullDate,
    maxTemp: Math.round(day.tempMax * 10) / 10,
    minTemp: Math.round(day.tempMin * 10) / 10,
    precipProb: day.precipProbMax,
    weatherCode: day.weatherCode,
    wind: Math.round(day.windSpeedMax),
  }));

  // Find min and max for sensible y-axis padding
  const allTemps = daily.flatMap((d) => [d.tempMax, d.tempMin]);
  const minT = Math.floor(Math.min(...allTemps) - 2);
  const maxT = Math.ceil(Math.max(...allTemps) + 2);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const weather = getWeatherCodeInfo(data.weatherCode);

      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-lg border border-slate-700 text-xs backdrop-blur-xs">
          <p className="font-bold text-sm text-slate-100">{data.name} ({data.date})</p>
          <p className="text-slate-300 font-medium my-1">{weather.label}</p>
          <div className="space-y-1 mt-2 pt-2 border-t border-slate-700">
            <p className="flex items-center justify-between gap-4">
              <span className="text-red-400">Max Temp:</span>
              <span className="font-bold">{data.maxTemp}{unitTemp}</span>
            </p>
            <p className="flex items-center justify-between gap-4">
              <span className="text-blue-400">Min Temp:</span>
              <span className="font-bold">{data.minTemp}{unitTemp}</span>
            </p>
            <p className="flex items-center justify-between gap-4">
              <span className="text-cyan-400">Rain Probability:</span>
              <span className="font-bold">{data.precipProb}%</span>
            </p>
            <p className="flex items-center justify-between gap-4">
              <span className="text-emerald-400">Max Wind:</span>
              <span className="font-bold">{data.wind}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="weather-visualization-section" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            7-Day Weather Trend
          </h3>
          <p className="text-xs text-slate-500">
            Visualize minimum and maximum temperature trajectories & rain trends
          </p>
        </div>

        {/* Metric Switcher Tab */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartMode('temperature')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              chartMode === 'temperature'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Temperature Range
          </button>
          <button
            type="button"
            onClick={() => setChartMode('precipitation')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              chartMode === 'precipitation'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rain Probability (%)
          </button>
        </div>
      </div>

      <div className="h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={200}>
          {chartMode === 'temperature' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="maxTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="minTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                domain={[minT, maxT]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                unit={unitTemp}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '12px' }}
              />
              <Area
                type="monotone"
                dataKey="maxTemp"
                name={`Max Temp (${unitTemp})`}
                stroke="#ef4444"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#maxTempGrad)"
              />
              <Area
                type="monotone"
                dataKey="minTemp"
                name={`Min Temp (${unitTemp})`}
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#minTempGrad)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="precipGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '12px' }}
              />
              <Area
                type="monotone"
                dataKey="precipProb"
                name="Precipitation Probability (%)"
                stroke="#0284c7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#precipGrad)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
};
