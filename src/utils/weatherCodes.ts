export interface WeatherCodeInfo {
  label: string;
  description: string;
  iconName: 'Sun' | 'CloudSun' | 'Cloud' | 'CloudFog' | 'CloudDrizzle' | 'CloudRain' | 'CloudSnow' | 'CloudLightning';
  badgeColor: string;
  bgGradient: string;
}

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  switch (code) {
    case 0:
      return {
        label: 'Clear Sky',
        description: 'Sunny and clear conditions',
        iconName: 'Sun',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        bgGradient: 'from-amber-500/10 to-orange-500/10',
      };
    case 1:
      return {
        label: 'Mainly Clear',
        description: 'Mostly sunny with scattered skies',
        iconName: 'Sun',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        bgGradient: 'from-amber-400/10 to-sky-400/10',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        description: 'Intermittent sunshine with clouds',
        iconName: 'CloudSun',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
        bgGradient: 'from-sky-400/10 to-slate-400/10',
      };
    case 3:
      return {
        label: 'Overcast',
        description: 'Cloud blanket covering the sky',
        iconName: 'Cloud',
        badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
        bgGradient: 'from-slate-400/10 to-gray-400/10',
      };
    case 45:
    case 48:
      return {
        label: 'Foggy',
        description: 'Reduced visibility due to fog/rime',
        iconName: 'CloudFog',
        badgeColor: 'bg-zinc-100 text-zinc-700 border-zinc-200',
        bgGradient: 'from-zinc-400/10 to-slate-300/10',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Drizzle',
        description: 'Light fine mist and precipitation',
        iconName: 'CloudDrizzle',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        bgGradient: 'from-cyan-400/10 to-blue-400/10',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        description: 'Cold drizzle freezing on contact',
        iconName: 'CloudSnow',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        bgGradient: 'from-indigo-400/10 to-sky-400/10',
      };
    case 61:
      return {
        label: 'Slight Rain',
        description: 'Light steady rainfall',
        iconName: 'CloudRain',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        bgGradient: 'from-blue-400/10 to-sky-500/10',
      };
    case 63:
      return {
        label: 'Moderate Rain',
        description: 'Continuous steady rain',
        iconName: 'CloudRain',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        bgGradient: 'from-blue-500/10 to-indigo-500/10',
      };
    case 65:
      return {
        label: 'Heavy Rain',
        description: 'Intense rain showers with high accumulation',
        iconName: 'CloudRain',
        badgeColor: 'bg-blue-200 text-blue-900 border-blue-300',
        bgGradient: 'from-blue-600/10 to-indigo-600/10',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        description: 'Hazardous icy rain conditions',
        iconName: 'CloudSnow',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        bgGradient: 'from-indigo-500/10 to-cyan-400/10',
      };
    case 71:
    case 73:
    case 75:
      return {
        label: 'Snowfall',
        description: 'Snow flurries to accumulating snowfall',
        iconName: 'CloudSnow',
        badgeColor: 'bg-cyan-50 text-cyan-900 border-cyan-200',
        bgGradient: 'from-cyan-300/10 to-blue-200/10',
      };
    case 77:
      return {
        label: 'Snow Grains',
        description: 'Small ice grains falling from clouds',
        iconName: 'CloudSnow',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        bgGradient: 'from-cyan-400/10 to-slate-300/10',
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Rain Showers',
        description: 'Scattered passing rain showers',
        iconName: 'CloudRain',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        bgGradient: 'from-blue-400/10 to-sky-500/10',
      };
    case 85:
    case 86:
      return {
        label: 'Snow Showers',
        description: 'Intermittent snow showers',
        iconName: 'CloudSnow',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        bgGradient: 'from-indigo-400/10 to-sky-300/10',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        description: 'Thunder and lightning activity',
        iconName: 'CloudLightning',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
        bgGradient: 'from-purple-500/10 to-amber-500/10',
      };
    case 96:
    case 99:
      return {
        label: 'Severe Thunderstorm',
        description: 'Thunderstorms with hail potential',
        iconName: 'CloudLightning',
        badgeColor: 'bg-red-100 text-red-900 border-red-200',
        bgGradient: 'from-red-500/10 to-purple-600/10',
      };
    default:
      return {
        label: 'Partly Cloudy',
        description: 'Typical mixed sky conditions',
        iconName: 'CloudSun',
        badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
        bgGradient: 'from-slate-400/10 to-gray-400/10',
      };
  }
}
