import { CurrentWeather } from "../../entities/WeatherCurrent.entity";

export interface IWeatherCacheRepository {
  /**
   * Busca clima atual no cache
   */
  getCurrent(latitude: number, longitude: number): Promise<CurrentWeather | null>;

  /**
   * Salva clima actual no cache
   */
  setCurrent(latitude: number, longitude: number, value: CurrentWeather): Promise<void>;
}
