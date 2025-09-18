import { IWeatherCacheRepository } from "../repositories/weather/IWeatherCache.repository";
import { ILocationRepository } from "../repositories/location/ILocation.repository";
import { WeatherCurrentDTO } from "../dtos/weather-current.dto";
import { WeatherDailyForecastDTO } from "../dtos/weather-daily-forecast.dto";
import { IWeatherServiceApi } from "../clients/weather/weather.service.api.interface";
import { WeatherCurrent } from "../entities/WeatherCurrent.entity";
import { WeatherDailyForecast } from "../entities/WeatherDailyForecast.entity";
import { getWeatherDescription } from "../utils/weather-code-map";

export class WeatherService {
  constructor(
    private readonly cache: IWeatherCacheRepository,
    private readonly locationRepo: ILocationRepository,
    private readonly weatherApi: IWeatherServiceApi
  ) {}

  async getCurrentByLocality(localidade: string): Promise<WeatherCurrentDTO> {
    const { latitude, longitude, nome } = await this.getCoordinatesFromLocality(localidade);
    const dto = await this.getCurrentByCoordinates(latitude, longitude);
    return { ...dto, cidade: nome };
  }

  async getForecast7dByLocality(localidade: string): Promise<WeatherDailyForecastDTO[]> {
    const { latitude, longitude } = await this.getCoordinatesFromLocality(localidade);
    return this.getForecast7dByCoordinates(latitude, longitude, localidade);
  }

  private async getCurrentByCoordinates(latitude: number, longitude: number): Promise<WeatherCurrentDTO> {
    let weather = await this.cache.getCurrent(latitude, longitude);

    if (!weather) {
      const data = await this.weatherApi.getCurrentWeather(latitude, longitude);
      weather = new WeatherCurrent(
        data.temperature,
        data.windspeed,
        data.winddirection,
        data.is_day === 1,
        getWeatherDescription(data.weathercode)
      );
      await this.cache.setCurrent(latitude, longitude, weather);
    }

    return this.toCurrentDTO(weather);
  }

  private async getForecast7dByCoordinates(
    latitude: number,
    longitude: number,
    cidade: string
  ): Promise<WeatherDailyForecastDTO[]> {
    let forecast = await this.cache.getForecast7d(latitude, longitude);

    if (!forecast) {
      const data = await this.weatherApi.getDailyForecast(latitude, longitude);
      forecast = data.map(dia => new WeatherDailyForecast(
        dia.data,
        dia.tempMax,
        dia.tempMin,
        dia.precipitacao,
        dia.ventoMax,
        dia.nascerDoSol,
        dia.porDoSol,
        cidade
      ));
      await this.cache.setForecast7d(latitude, longitude, forecast);
    }

    return forecast.map(this.toDailyForecastDTO);
  }

  private toCurrentDTO = (entity: WeatherCurrent): WeatherCurrentDTO => ({
    cidade: entity.cidade,
    temperatura: entity.temperatura,
    vento: entity.vento,
    direcaoVento: entity.direcaoVento,
    ehDia: entity.ehDia,
    descricao: entity.descricao
  });

  private toDailyForecastDTO = (entity: WeatherDailyForecast): WeatherDailyForecastDTO => ({
    data: entity.data,
    tempMax: entity.tempMax,
    tempMin: entity.tempMin,
    precipitacao: entity.precipitacao,
    ventoMax: entity.ventoMax,
    nascerDoSol: entity.nascerDoSol,
    porDoSol: entity.porDoSol
  });

  private async getCoordinatesFromLocality(localidade: string) {
    const location = await this.locationRepo.getByName(localidade);
    if (!location) throw new Error("Localidade não encontrada no banco de dados");
    return location;
  }
}
