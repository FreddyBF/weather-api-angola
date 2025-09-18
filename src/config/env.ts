export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || "development",
  redisHost: process.env.REDIS_HOST || "127.0.0.1",
  redisPort: Number(process.env.REDIS_PORT || 6379),
  redisPassword: process.env.REDIS_PASSWORD || undefined,
  redisUserName: process.env.REDIS_USER_NAME,
  weatherApiBaseUrl: process.env.WEATHER_API_BASE_URL || "https://api.open-meteo.com/v1/forecast",
  weatherTimezone: process.env.WEATHER_TIMEZONE || "Africa/Luanda",
  weatherApiTimeout: Number(process.env.WEATHER_API_TIMEOUT || 8000),
  cacheTtlCurrent: Number(process.env.CACHE_TTL_CURRENT || 600),
  cacheTtlForecast24h: Number(process.env.CACHE_TTL_FORECAST_24H || 3600),
  cacheTtlForecast7d: Number(process.env.CACHE_TTL_FORECAST_7D || 21600)
};

