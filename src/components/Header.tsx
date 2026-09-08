import React from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';
import { UnitSystem } from '../types';

interface HeaderProps {
  unitSystem: UnitSystem;
  onToggleUnits: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  unitSystem,
  onToggleUnits,
  onRefresh,
  isLoading,
}) => {
  return (
    <header id="app-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Weather Intelligence App
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                Open-Meteo
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Forecast, real-time metrics & smart planning recommendations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              id="unit-toggle-celsius"
              type="button"
              onClick={() => unitSystem !== 'metric' && onToggleUnits()}
              className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                unitSystem === 'metric'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °C
            </button>
            <button
              id="unit-toggle-fahrenheit"
              type="button"
              onClick={() => unitSystem !== 'imperial' && onToggleUnits()}
              className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                unitSystem === 'imperial'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °F
            </button>
          </div>

          {/* Refresh Button */}
          <button
            id="refresh-button"
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh current weather data"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
