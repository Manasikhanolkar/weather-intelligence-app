import { CurrentWeatherData, DailyForecastDay, Recommendation, UnitSystem } from '../types';

/**
 * Generates rule-based planning recommendations strictly using deterministic logic
 * from Open-Meteo current weather and 7-day forecast data.
 * No AI or external services are called.
 */
export function generateRecommendations(
  current: CurrentWeatherData,
  daily: DailyForecastDay[],
  unitSystem: UnitSystem
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Convert current temp to Celsius for consistent rule evaluation
  const currentTempC = unitSystem === 'imperial'
    ? ((current.temperature - 32) * 5) / 9
    : current.temperature;

  const currentWindKmh = unitSystem === 'imperial'
    ? current.windSpeed * 1.60934
    : current.windSpeed;

  // Rain / Precipitation evaluation
  const isCurrentlyRaining = current.precipitation > 0 || (current.weatherCode >= 51 && current.weatherCode <= 67) || (current.weatherCode >= 80 && current.weatherCode <= 82);
  const todayForecast = daily[0];
  const rainExpectedSoon = todayForecast && todayForecast.precipProbMax >= 40;
  const heavyRainExpected = todayForecast && todayForecast.precipProbMax >= 70;

  if (isCurrentlyRaining || heavyRainExpected) {
    recommendations.push({
      id: 'rain-alert',
      category: 'rain',
      level: 'warning',
      title: isCurrentlyRaining ? 'Precipitation Active' : 'Rain Expected',
      message: 'Carry an umbrella or rain jacket.',
      iconName: 'Umbrella',
    });
  } else if (rainExpectedSoon) {
    recommendations.push({
      id: 'rain-caution',
      category: 'rain',
      level: 'advisory',
      title: 'Rain Expected Today',
      message: 'Carry an umbrella or rain jacket.',
      iconName: 'Umbrella',
    });
  }

  // Temperature evaluation
  if (currentTempC >= 32) {
    recommendations.push({
      id: 'temp-extreme-heat',
      category: 'temperature',
      level: 'warning',
      title: 'High Temperature',
      message: 'Stay hydrated and consider avoiding strenuous outdoor activities during the hottest hours.',
      iconName: 'Flame',
    });
  } else if (currentTempC >= 28) {
    recommendations.push({
      id: 'temp-warm',
      category: 'temperature',
      level: 'info',
      title: 'Warm Conditions',
      message: 'Stay hydrated and wear breathable light clothing if spending extended time outside.',
      iconName: 'Sun',
    });
  } else if (currentTempC <= 0) {
    recommendations.push({
      id: 'temp-freezing',
      category: 'temperature',
      level: 'warning',
      title: 'Freezing Weather',
      message: 'Consider wearing warm layers.',
      iconName: 'Snowflake',
    });
  } else if (currentTempC < 10) {
    recommendations.push({
      id: 'temp-cold',
      category: 'temperature',
      level: 'advisory',
      title: 'Cold Weather',
      message: 'Consider wearing warm layers.',
      iconName: 'ThermometerSnowflake',
    });
  }

  // Wind evaluation
  if (currentWindKmh >= 35) {
    recommendations.push({
      id: 'wind-gale',
      category: 'wind',
      level: 'warning',
      title: 'High Wind',
      message: 'Use caution with outdoor activities.',
      iconName: 'Wind',
    });
  } else if (currentWindKmh >= 24) {
    recommendations.push({
      id: 'wind-breeze',
      category: 'wind',
      level: 'info',
      title: 'Brisk Wind',
      message: 'Use caution with outdoor activities in exposed or elevated areas.',
      iconName: 'Wind',
    });
  }

  // Mild / Ideal Weather check
  const isMildTemp = currentTempC >= 17 && currentTempC <= 26;
  const isLowRain = current.precipitation === 0 && (!todayForecast || todayForecast.precipProbMax < 25);
  const isCalmWind = currentWindKmh < 24;

  if (isMildTemp && isLowRain && isCalmWind) {
    recommendations.push({
      id: 'outdoor-ideal',
      category: 'outdoor',
      level: 'info',
      title: 'Good/Mild Weather',
      message: 'Conditions look suitable for outdoor activities.',
      iconName: 'Smile',
    });
  }

  // Humidity insights
  if (current.relativeHumidity >= 85 && currentTempC >= 24) {
    recommendations.push({
      id: 'high-humidity',
      category: 'temperature',
      level: 'advisory',
      title: 'High Humidity',
      message: 'Elevated humidity may make temperatures feel muggier than actual readings. Stay hydrated.',
      iconName: 'Droplets',
    });
  } else if (current.relativeHumidity <= 25) {
    recommendations.push({
      id: 'low-humidity',
      category: 'outdoor',
      level: 'info',
      title: 'Dry Air',
      message: 'Very low relative humidity. Consider using moisturizer and staying well hydrated.',
      iconName: 'SunMedium',
    });
  }

  // 7-day Planning highlight: Best upcoming day
  if (daily.length > 1) {
    const upcomingDays = daily.slice(1);
    // Score each day: lower rain prob is better, temp between 18-25 is ideal, wind < 25 is ideal
    let bestDay = upcomingDays[0];
    let lowestRainProb = 100;

    for (const day of upcomingDays) {
      if (day.precipProbMax < lowestRainProb) {
        lowestRainProb = day.precipProbMax;
        bestDay = day;
      }
    }

    if (bestDay && lowestRainProb <= 25) {
      recommendations.push({
        id: 'planning-best-day',
        category: 'outdoor',
        level: 'info',
        title: `7-Day Outlook: ${bestDay.dayName}`,
        message: `${bestDay.dayName} shows the lowest precipitation risk (${bestDay.precipProbMax}%) with comfortable highs around ${Math.round(bestDay.tempMax)}${unitSystem === 'imperial' ? '°F' : '°C'}, ideal for scheduling outdoor plans.`,
        iconName: 'CalendarCheck',
      });
    }
  }

  return recommendations;
}
