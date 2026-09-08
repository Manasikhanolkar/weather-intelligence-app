import React from 'react';
import { Thermometer, Droplets, CloudRain, Wind, Gauge } from 'lucide-react';
import { CurrentWeatherData } from '../types';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  current: CurrentWeatherData;
  units: {
    temperature: string;
    windSpeed: string;
    precipitation: string;
  };
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ current, units }) => {
  const codeInfo = getWeatherCodeInfo(current.weatherCode);

  return (
    <div id="current-weather-card" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Current Weather
        </h3>
        <span
          id="current-weather-condition-badge"
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${codeInfo.badgeColor}`}
        >
          {codeInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Main Temperature & Visual */}
        <div className="md:col-span-6 flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
            <WeatherIcon weatherCode={current.weatherCode} className="w-16 h-16" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span id="current-temperature" className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
                {Math.round(current.temperature)}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-500 ml-1">
                {units.temperature}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 mt-1">
              {codeInfo.description}
            </p>
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="md:col-span-6 grid grid-cols-2 gap-3">
          {/* Feels Like */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Feels Like</p>
              <p id="current-feels-like" className="text-base font-bold text-slate-900">
                {Math.round(current.apparentTemperature)}{units.temperature}
              </p>
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Humidity</p>
              <p id="current-humidity" className="text-base font-bold text-slate-900">
                {current.relativeHumidity}%
              </p>
            </div>
          </div>

          {/* Precipitation */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Precipitation</p>
              <p id="current-precipitation" className="text-base font-bold text-slate-900">
                {current.precipitation} {units.precipitation}
              </p>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Wind Speed</p>
              <p id="current-wind-speed" className="text-base font-bold text-slate-900">
                {current.windSpeed} {units.windSpeed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
