import axios, { AxiosError } from "axios";
import { env } from "../../../config/env";
import { IWeatherServiceApi } from "../weather.service.api.interface";
import { CurrentWeather } from "../../../entities/WeatherCurrent.entity";
import { WeatherApiException } from "../../../errors/weather-api.exception"; 

class WeatherServiceApi implements IWeatherServiceApi {
  private baseUrl = env.weatherApiBaseUrl;
  private timezone = env.weatherTimezone;
  private timeout = env.weatherApiTimeout;

  public async getCurrentWeather(
    latitude: number, longitude: number
  ): Promise<CurrentWeather> {
    try {
      const { data } = await axios.get(this.baseUrl, {
        params: {
          latitude,
          longitude,
          current: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "weather_code"
          ].join(","),
          timezone: this.timezone,
        },
        timeout: this.timeout,
      });

      const current = data.current;

      if (!current) {
        throw new WeatherApiException("Resposta inválida da API de clima");
      }
      return CurrentWeather.create(
        current.temperature_2m,
        current.apparent_temperature,
        current.relative_humidity_2m,
        current.weather_code
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new WeatherApiException(
          `Erro na chamada à API de clima: ${error.message}`
        );
      }
      throw new WeatherApiException(
        "Erro inesperado ao buscar clima actual"
      );
    }
  }
}

export { WeatherServiceApi }


