import { WeatherCurrent } from "../../entities/WeatherCurrent.entity";
import { WeatherDailyForecast } from "../../entities/WeatherDailyForecast.entity";


export interface IWeatherCacheRepository {
  /**
   * Busca clima atual no cache
   */
  getCurrent(latitude: number, longitude: number): Promise<WeatherCurrent | null>;

  /**
   * Salva clima atual no cache
   */
  setCurrent(latitude: number, longitude: number, value: WeatherCurrent): Promise<void>;

  /**
   * Busca previsão de 7 dias no cache
   */
  getForecast7d(latitude: number, longitude: number): Promise<WeatherDailyForecast[] | null>;

  /**
   * Salva previsão de 7 dias no cache
   */
  setForecast7d(latitude: number, longitude: number, value: WeatherDailyForecast[]): Promise<void>;
}
