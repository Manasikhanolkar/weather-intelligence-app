export type UnitSystem = 'metric' | 'imperial';

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code?: string;
  admin1?: string; // state/region
  timezone: string;
}

export interface CurrentWeatherData {
  time: string;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
}

export interface DailyForecastDay {
  date: string;
  dayName: string;
  fullDate: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipProbMax: number;
  precipSum: number;
  windSpeedMax: number;
  uvIndexMax?: number;
}

export interface WeatherData {
  location: LocationResult;
  current: CurrentWeatherData;
  daily: DailyForecastDay[];
  units: {
    temperature: string; // '°C' or '°F'
    windSpeed: string;   // 'km/h' or 'mph'
    precipitation: string; // 'mm' or 'in'
  };
}

export interface Recommendation {
  id: string;
  category: 'rain' | 'temperature' | 'wind' | 'outdoor' | 'sun';
  level: 'info' | 'advisory' | 'warning';
  title: string;
  message: string;
  iconName: string;
}
