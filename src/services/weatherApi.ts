import { LocationResult, WeatherData, DailyForecastDay, UnitSystem } from '../types';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Searches for matching locations using Open-Meteo Geocoding API
 */
export async function searchLocations(query: string): Promise<LocationResult[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error('Please enter a city name to search.');
  }

  try {
    const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geocoding service error (${response.status})`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('City not found. Please check the city name and try again.');
    }

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country || '',
      country_code: item.country_code || '',
      admin1: item.admin1 || '',
      timezone: item.timezone || 'auto',
    }));
  } catch (err: any) {
    if (err.message && err.message.includes('City not found')) {
      throw err;
    }
    if (err.message && err.message.includes('Please enter')) {
      throw err;
    }
    // Handle network or connection failures
    throw new Error('Unable to connect to the weather service. Please check your network connection and try again.');
  }
}

/**
 * Fetches current weather and 7-day forecast for given coordinates
 */
export async function fetchWeatherForLocation(
  location: LocationResult,
  unitSystem: UnitSystem = 'metric'
): Promise<WeatherData> {
  const tempUnit = unitSystem === 'imperial' ? 'fahrenheit' : 'celsius';
  const windUnit = unitSystem === 'imperial' ? 'mph' : 'kmh';
  const precipUnit = unitSystem === 'imperial' ? 'inch' : 'mm';

  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,precipitation_sum,uv_index_max',
    forecast_days: '7',
    timezone: location.timezone || 'auto',
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit,
    precipitation_unit: precipUnit,
  });

  try {
    const response = await fetch(`${FORECAST_BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Weather service error (${response.status})`);
    }

    const data = await response.json();

    if (!data.current || !data.daily) {
      throw new Error('Weather data is currently unavailable for this location.');
    }

    // Process daily forecast items
    const dailyItems: DailyForecastDay[] = [];
    const dailyTimes: string[] = data.daily.time || [];

    for (let i = 0; i < dailyTimes.length; i++) {
      const dateStr = dailyTimes[i];
      // Format day name
      const dateObj = new Date(dateStr + 'T00:00:00');
      let dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      if (i === 0) dayName = 'Today';
      else if (i === 1) dayName = 'Tomorrow';

      const fullDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      dailyItems.push({
        date: dateStr,
        dayName,
        fullDate,
        weatherCode: data.daily.weather_code?.[i] ?? 0,
        tempMax: data.daily.temperature_2m_max?.[i] ?? 0,
        tempMin: data.daily.temperature_2m_min?.[i] ?? 0,
        precipProbMax: data.daily.precipitation_probability_max?.[i] ?? 0,
        precipSum: data.daily.precipitation_sum?.[i] ?? 0,
        windSpeedMax: data.daily.wind_speed_10m_max?.[i] ?? 0,
        uvIndexMax: data.daily.uv_index_max?.[i] ?? undefined,
      });
    }

    return {
      location,
      current: {
        time: data.current.time,
        temperature: Math.round((data.current.temperature_2m ?? 0) * 10) / 10,
        apparentTemperature: Math.round((data.current.apparent_temperature ?? 0) * 10) / 10,
        relativeHumidity: data.current.relative_humidity_2m ?? 0,
        precipitation: data.current.precipitation ?? 0,
        weatherCode: data.current.weather_code ?? 0,
        windSpeed: Math.round((data.current.wind_speed_10m ?? 0) * 10) / 10,
      },
      daily: dailyItems,
      units: {
        temperature: unitSystem === 'imperial' ? '°F' : '°C',
        windSpeed: unitSystem === 'imperial' ? 'mph' : 'km/h',
        precipitation: unitSystem === 'imperial' ? 'in' : 'mm',
      },
    };
  } catch (err: any) {
    if (err.message && err.message.includes('Weather data is currently unavailable')) {
      throw err;
    }
    throw new Error('Unable to retrieve weather forecast. Please try again in a few moments.');
  }
}
