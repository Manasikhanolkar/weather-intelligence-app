import React from 'react';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  onTryCity?: (city: string) => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  onTryCity,
}) => {
  return (
    <div
      id="error-state-container"
      className="bg-white rounded-2xl border border-rose-200 p-6 sm:p-8 text-center shadow-xs"
    >
      <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
        Unable to Load Weather
      </h3>
      <p id="error-message-text" className="text-sm text-slate-600 max-w-md mx-auto mb-5">
        {message || 'City not found. Please check the city name and try again.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            id="error-retry-button"
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}

        {onTryCity && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Or try:</span>
            {['London', 'Tokyo', 'New York'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => onTryCity(city)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md border border-slate-200 transition-colors cursor-pointer"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
