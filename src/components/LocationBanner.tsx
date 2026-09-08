import React from 'react';
import { MapPin, Globe, Compass, Clock } from 'lucide-react';
import { LocationResult } from '../types';

interface LocationBannerProps {
  location: LocationResult;
}

export const LocationBanner: React.FC<LocationBannerProps> = ({ location }) => {
  const formatCoord = (val: number, type: 'lat' | 'lon') => {
    const dir = type === 'lat' ? (val >= 0 ? 'N' : 'S') : val >= 0 ? 'E' : 'W';
    return `${Math.abs(val).toFixed(4)}° ${dir}`;
  };

  return (
    <div id="location-banner" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <MapPin className="w-5 h-5" />
            </span>
            <h2 id="location-city-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              {location.name}
            </h2>
            {location.country_code && (
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 uppercase">
                {location.country_code}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 mt-1 pl-9">
            {location.admin1 ? `${location.admin1}, ` : ''}
            {location.country}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Compass className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Latitude</p>
              <p className="font-semibold text-slate-800">{formatCoord(location.latitude, 'lat')}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Compass className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Longitude</p>
              <p className="font-semibold text-slate-800">{formatCoord(location.longitude, 'lon')}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Timezone</p>
              <p className="font-semibold text-slate-800 truncate max-w-[120px]">{location.timezone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
