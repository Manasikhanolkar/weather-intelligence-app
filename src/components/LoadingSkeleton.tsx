import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div id="weather-loading-skeleton" className="space-y-6 animate-pulse">
      {/* Location Banner Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-slate-200 rounded-lg"></div>
            <div className="h-4 w-32 bg-slate-100 rounded-md"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-12 w-28 bg-slate-100 rounded-xl"></div>
            <div className="h-12 w-28 bg-slate-100 rounded-xl"></div>
            <div className="h-12 w-28 bg-slate-100 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Current Weather Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 flex items-center gap-5">
            <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
            <div className="space-y-2">
              <div className="h-12 w-32 bg-slate-200 rounded-lg"></div>
              <div className="h-4 w-40 bg-slate-100 rounded-md"></div>
            </div>
          </div>
          <div className="md:col-span-6 grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="h-6 w-44 bg-slate-200 rounded-md mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="h-6 w-48 bg-slate-200 rounded-md mb-6"></div>
        <div className="h-64 bg-slate-100 rounded-xl"></div>
      </div>
    </div>
  );
};
