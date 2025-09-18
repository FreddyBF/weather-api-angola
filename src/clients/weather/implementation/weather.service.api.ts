import axios from "axios";
import { env } from "../../../config/env";
import { IWeatherServiceApi } from "../weather.service.api.interface";
import { DailyForecast, CurrentWeather } from "../../../types/weather-api.types";

export class WeatherServiceApi implements IWeatherServiceApi {
  private baseUrl = env.weatherApiBaseUrl;
  private timezone = env.weatherTimezone;
  private timeout = env.weatherApiTimeout;

  async getCurrentWeather(
    latitude: number,
    longitude: number
  ): Promise<CurrentWeather> {

    const { data } = await axios.get(
      this.baseUrl, 
      {
        params: {
          latitude,
          longitude,
          current_weather: true,
          timezone: this.timezone
        },
        timeout: this.timeout
    });
    return {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        is_day: data.current_weather.is_day,
        weathercode: data.current_weather.weathercode
    }
  }

  async getDailyForecast(
      latitude: number,
      longitude: number
  ): Promise<DailyForecast[]> {
    const { data } = await axios.get(this.baseUrl, {
    params: {
      latitude,
      longitude,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "sunrise",
        "sunset",
        "windspeed_10m_max"
      ].join(","),
      timezone: this.timezone
    },
    timeout: this.timeout
  });

  const previsao: DailyForecast[] = data.daily.time.map((_: string, index: number) => ({
    data: data.daily.time[index],
    tempMax: data.daily.temperature_2m_max[index],
    tempMin: data.daily.temperature_2m_min[index],
    precipitacao: data.daily.precipitation_sum[index],
    nascerDoSol: data.daily.sunrise[index],
    porDoSol: data.daily.sunset[index],
    ventoMax: data.daily.windspeed_10m_max[index]
  }));
  return previsao;
  }
}

