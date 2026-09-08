import React from 'react';
import { CloudRain, Wind, ArrowUp, ArrowDown } from 'lucide-react';
import { DailyForecastDay } from '../types';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface Forecast7DayProps {
  daily: DailyForecastDay[];
  units: {
    temperature: string;
    windSpeed: string;
    precipitation: string;
  };
}

export const Forecast7Day: React.FC<Forecast7DayProps> = ({ daily, units }) => {
  return (
    <section id="forecast-7-day-section" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            7-Day Weather Forecast
          </h3>
          <p className="text-xs text-slate-500">
            Daily temperature range, weather condition, rain chance & wind limits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {daily.map((day, idx) => {
          const codeInfo = getWeatherCodeInfo(day.weatherCode);
          const isToday = idx === 0;

          return (
            <div
              key={day.date}
              id={`forecast-card-${day.date}`}
              className={`rounded-xl p-3.5 border transition-all flex flex-col justify-between ${
                isToday
                  ? 'bg-blue-50/50 border-blue-200 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header: Day & Date */}
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${isToday ? 'text-blue-700' : 'text-slate-900'}`}>
                    {day.dayName}
                  </span>
                  {isToday && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-blue-600 text-white rounded">
                      Now
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-3">{day.fullDate}</p>

                {/* Icon & Condition */}
                <div className="flex flex-col items-center py-2 text-center">
                  <WeatherIcon weatherCode={day.weatherCode} className="w-10 h-10 mb-1.5" />
                  <p className="text-xs font-semibold text-slate-700 line-clamp-1" title={codeInfo.label}>
                    {codeInfo.label}
                  </p>
                </div>
              </div>

              {/* Temperatures */}
              <div className="pt-2 border-t border-slate-200/80 mt-2">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-0.5 text-slate-900 font-bold">
                    <ArrowUp className="w-3 h-3 text-red-500 shrink-0" />
                    <span>{Math.round(day.tempMax)}{units.temperature}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-slate-500 font-medium">
                    <ArrowDown className="w-3 h-3 text-blue-500 shrink-0" />
                    <span>{Math.round(day.tempMin)}{units.temperature}</span>
                  </div>
                </div>

                {/* Rain Probability */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1.5">
                  <span className="flex items-center gap-1">
                    <CloudRain className="w-3 h-3 text-blue-500 shrink-0" />
                    <span>Rain</span>
                  </span>
                  <span className={`font-semibold ${day.precipProbMax >= 50 ? 'text-blue-700' : 'text-slate-700'}`}>
                    {day.precipProbMax}%
                  </span>
                </div>

                {/* Wind Info */}
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Wind</span>
                  </span>
                  <span className="font-medium text-slate-700">
                    {Math.round(day.windSpeedMax)} {units.windSpeed}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
