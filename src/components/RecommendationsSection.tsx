import React from 'react';
import {
  Umbrella,
  Sun,
  Flame,
  Snowflake,
  ThermometerSnowflake,
  Wind,
  Smile,
  Droplets,
  CalendarCheck,
  SunMedium,
  ShieldAlert,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
}) => {
  const renderIcon = (name: string, level: string) => {
    const iconClass = 'w-5 h-5 shrink-0';
    switch (name) {
      case 'Umbrella':
        return <Umbrella className={`${iconClass} text-blue-600`} />;
      case 'Flame':
        return <Flame className={`${iconClass} text-red-600`} />;
      case 'Sun':
        return <Sun className={`${iconClass} text-amber-500`} />;
      case 'Snowflake':
        return <Snowflake className={`${iconClass} text-sky-500`} />;
      case 'ThermometerSnowflake':
        return <ThermometerSnowflake className={`${iconClass} text-indigo-600`} />;
      case 'Wind':
        return <Wind className={`${iconClass} text-teal-600`} />;
      case 'Smile':
        return <Smile className={`${iconClass} text-emerald-600`} />;
      case 'Droplets':
        return <Droplets className={`${iconClass} text-cyan-600`} />;
      case 'CalendarCheck':
        return <CalendarCheck className={`${iconClass} text-purple-600`} />;
      case 'SunMedium':
        return <SunMedium className={`${iconClass} text-orange-500`} />;
      default:
        return level === 'warning' ? (
          <AlertTriangle className={`${iconClass} text-amber-600`} />
        ) : (
          <Info className={`${iconClass} text-blue-600`} />
        );
    }
  };

  const getCardStyle = (level: 'info' | 'advisory' | 'warning') => {
    switch (level) {
      case 'warning':
        return 'bg-red-50/70 border-red-200 text-red-950';
      case 'advisory':
        return 'bg-amber-50/70 border-amber-200 text-amber-950';
      case 'info':
      default:
        return 'bg-blue-50/60 border-blue-200 text-slate-900';
    }
  };

  const getBadgeStyle = (level: 'info' | 'advisory' | 'warning') => {
    switch (level) {
      case 'warning':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'advisory':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <section id="recommendations-section" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Weather Intelligence & Planning Recommendations
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Rule-based practical planning insights generated from current weather and forecast conditions
          </p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-sm text-slate-600">
          Standard mild conditions. No special weather advisories at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              id={`recommendation-${rec.id}`}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${getCardStyle(
                rec.level
              )}`}
            >
              <div className="p-2 bg-white rounded-lg border border-slate-200/80 shadow-2xs shrink-0">
                {renderIcon(rec.iconName, rec.level)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeStyle(
                      rec.level
                    )}`}
                  >
                    {rec.level}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {rec.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
