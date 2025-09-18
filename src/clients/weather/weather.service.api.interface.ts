import { DailyForecast, CurrentWeather } from "../../types/weather-api.types";
export interface IWeatherServiceApi {
  /**
   * Obtém o clima atual para uma latitude/longitude.
   * @param latitude Latitude do local.
   * @param longitude Longitude do local.
   * @returns Dados do clima atual.
   */
  getCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather>;

  /**
   * Obtém a previsão diária para uma latitude/longitude.
   * @param latitude Latitude do local.
   * @param longitude Longitude do local.
   * @returns Lista de previsões diárias.
   */
  getDailyForecast(latitude: number, longitude: number): Promise<DailyForecast[]>;
}
