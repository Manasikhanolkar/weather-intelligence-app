import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { LocationBanner } from './components/LocationBanner';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { Forecast7Day } from './components/Forecast7Day';
import { WeatherChart } from './components/WeatherChart';
import { RecommendationsSection } from './components/RecommendationsSection';
import { ErrorState } from './components/ErrorState';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { LocationResult, WeatherData, UnitSystem, Recommendation } from './types';
import { searchLocations, fetchWeatherForLocation } from './services/weatherApi';
import { generateRecommendations } from './utils/recommendations';

const DEFAULT_INITIAL_CITY = 'London';

export default function App() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [activeLocation, setActiveLocation] = useState<LocationResult | null>(null);
  const [searchResults, setSearchResults] = useState<LocationResult[] | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState<string>(DEFAULT_INITIAL_CITY);

  // Load weather for a specific location object
  const loadWeather = useCallback(async (location: LocationResult, unit: UnitSystem) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchWeatherForLocation(location, unit);
      setWeatherData(data);
      setActiveLocation(location);

      const recs = generateRecommendations(data.current, data.daily, unit);
      setRecommendations(recs);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to retrieve weather data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle city search from input
  const handleSearch = useCallback(async (cityName: string) => {
    const query = cityName.trim();
    if (!query) {
      setErrorMessage('Please enter a city name to search.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setLastSearchedCity(query);

    try {
      const locations = await searchLocations(query);
      setSearchResults(locations);

      if (locations.length > 0) {
        // Auto-select first matching location
        const primaryLoc = locations[0];
        await loadWeather(primaryLoc, unitSystem);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'City not found. Please check the city name and try again.');
      setSearchResults(null);
      setWeatherData(null);
      setIsLoading(false);
    }
  }, [loadWeather, unitSystem]);

  // Initial load on mount
  useEffect(() => {
    handleSearch(DEFAULT_INITIAL_CITY);
  }, []);

  // Unit toggle handler
  const handleToggleUnits = () => {
    const nextUnit: UnitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(nextUnit);
    if (activeLocation) {
      loadWeather(activeLocation, nextUnit);
    }
  };

  // Refresh handler
  const handleRefresh = () => {
    if (activeLocation) {
      loadWeather(activeLocation, unitSystem);
    } else {
      handleSearch(lastSearchedCity);
    }
  };

  // Selection from disambiguation list
  const handleSelectLocation = (loc: LocationResult) => {
    loadWeather(loc, unitSystem);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Header
        unitSystem={unitSystem}
        onToggleUnits={handleToggleUnits}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* City Search Bar & Disambiguation */}
        <SearchSection
          onSearch={handleSearch}
          onSelectLocation={handleSelectLocation}
          searchResults={searchResults}
          isLoading={isLoading}
          activeCityName={activeLocation?.name}
        />

        {/* Error State */}
        {errorMessage && !isLoading && (
          <ErrorState
            message={errorMessage}
            onRetry={() => handleSearch(lastSearchedCity)}
            onTryCity={(city) => handleSearch(city)}
          />
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Main Weather Information Display */}
        {!isLoading && !errorMessage && weatherData && (
          <div className="space-y-6">
            {/* 1. Location Banner (City, Country, Lat, Lon, Timezone) */}
            <LocationBanner location={weatherData.location} />

            {/* 2. Current Weather (Temp, Feels Like, Humidity, Precip, Wind) */}
            <CurrentWeatherCard
              current={weatherData.current}
              units={weatherData.units}
            />

            {/* 3. Weather Intelligence / Recommendations */}
            <RecommendationsSection recommendations={recommendations} />

            {/* 4. Weather Trends Visualization (Temperature & Rain Chart) */}
            <WeatherChart
              daily={weatherData.daily}
              unitTemp={weatherData.units.temperature}
            />

            {/* 5. 7-Day Daily Forecast Cards */}
            <Forecast7Day
              daily={weatherData.daily}
              units={weatherData.units}
            />
          </div>
        )}
      </main>

      {/* Footer with Open-Meteo attribution and Cloudflare info */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-medium text-slate-700">Weather Intelligence App</p>
            <p className="mt-0.5">
              Public meteorological data provided by{' '}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Open-Meteo
              </a>{' '}
              (CC BY 4.0).
            </p>
          </div>
          <div className="text-slate-400">
            <span>No private API keys required &bull; Ready for Cloudflare Pages</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
