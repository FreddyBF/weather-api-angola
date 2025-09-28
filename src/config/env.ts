import { config } from 'dotenv';
config()
export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || "development",
  redisHost: process.env.REDIS_HOST || "127.0.0.1",
  redisPort: Number(process.env.REDIS_PORT || 6379),
  weatherApiBaseUrl: process.env.WEATHER_API_BASE_URL || "https://api.open-meteo.com/v1/forecast",
  weatherTimezone: process.env.WEATHER_TIMEZONE || "Africa/Luanda",
  weatherApiTimeout: Number(process.env.WEATHER_API_TIMEOUT || 1500),
  cacheTtlCurrent: Number(process.env.CACHE_TTL_CURRENT || 600),
  cacheTtlForecast7d: Number(process.env.CACHE_TTL_FORECAST_7D || 21600)
};

