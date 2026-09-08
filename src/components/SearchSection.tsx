import React, { useState, FormEvent } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { LocationResult } from '../types';

interface SearchSectionProps {
  onSearch: (city: string) => void;
  onSelectLocation: (loc: LocationResult) => void;
  searchResults: LocationResult[] | null;
  isLoading: boolean;
  activeCityName?: string;
}

const POPULAR_CITIES = [
  'London',
  'Tokyo',
  'New York',
  'Paris',
  'San Francisco',
  'Sydney',
];

export const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  onSelectLocation,
  searchResults,
  isLoading,
  activeCityName,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleQuickSelect = (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <section id="search-section" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any city or town (e.g., Tokyo, Berlin, Seattle)..."
            disabled={isLoading}
            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          id="city-search-button"
          type="submit"
          disabled={isLoading || !query.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl text-sm sm:text-base transition-colors shadow-xs shrink-0 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Search City</span>
            </>
          )}
        </button>
      </form>

      {/* Multiple Location Matches Selector */}
      {searchResults && searchResults.length > 1 && (
        <div id="disambiguation-section" className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            Multiple matching locations found. Choose your exact city:
          </p>
          <div className="flex flex-wrap gap-2">
            {searchResults.map((loc) => {
              const label = `${loc.name}${loc.admin1 ? `, ${loc.admin1}` : ''}, ${loc.country}`;
              const isSelected = activeCityName === loc.name;
              return (
                <button
                  key={loc.id}
                  id={`select-location-${loc.id}`}
                  type="button"
                  onClick={() => onSelectLocation(loc)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-blue-50 border-blue-300 text-blue-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular Cities Chips */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">Quick suggestions:</span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handleQuickSelect(city)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md border border-slate-200/80 transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
};
