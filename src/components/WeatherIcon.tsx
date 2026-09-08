import React from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  LucideProps,
} from 'lucide-react';
import { getWeatherCodeInfo } from '../utils/weatherCodes';

interface WeatherIconProps extends LucideProps {
  weatherCode?: number;
  iconName?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  weatherCode,
  iconName,
  className = 'w-6 h-6',
  ...rest
}) => {
  const resolvedName = iconName || (weatherCode !== undefined ? getWeatherCodeInfo(weatherCode).iconName : 'Sun');

  switch (resolvedName) {
    case 'Sun':
      return <Sun className={`text-amber-500 ${className}`} {...rest} />;
    case 'CloudSun':
      return <CloudSun className={`text-amber-500 ${className}`} {...rest} />;
    case 'Cloud':
      return <Cloud className={`text-slate-500 ${className}`} {...rest} />;
    case 'CloudFog':
      return <CloudFog className={`text-zinc-500 ${className}`} {...rest} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={`text-cyan-500 ${className}`} {...rest} />;
    case 'CloudRain':
      return <CloudRain className={`text-blue-500 ${className}`} {...rest} />;
    case 'CloudSnow':
      return <CloudSnow className={`text-sky-400 ${className}`} {...rest} />;
    case 'CloudLightning':
      return <CloudLightning className={`text-purple-600 ${className}`} {...rest} />;
    default:
      return <CloudSun className={`text-slate-500 ${className}`} {...rest} />;
  }
};
