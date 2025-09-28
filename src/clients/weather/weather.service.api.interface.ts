import { CurrentWeather } from "../../entities/WeatherCurrent.entity";

export interface IWeatherServiceApi {
  /**
   * Obtém o clima atual para uma latitude/longitude.
   * @param latitude Latitude do local.
   * @param longitude Longitude do local.
   * @returns Dados do clima atual.
   */
  getCurrentWeather(
    latitude: number, longitude: number
  ): Promise<CurrentWeather>;
}
