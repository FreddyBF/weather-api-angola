import { IWeatherCacheRepository } from "../repositories/weather/IWeatherCache.repository";
import { ILocationRepository } from "../repositories/location/ILocation.repository";
import { WeatherCurrentDTO } from "../dtos/weather-current.dto";
import { IWeatherServiceApi } from "../clients/weather/weather.service.api.interface";
import { weatherCodeMap } from "../helpers/weather-code-map";
import { CurrentWeather } from "../entities/WeatherCurrent.entity";
import { NotFoundException } from "../errors/not-found.exception";

class WeatherService {
  constructor(
    private readonly cacheRepository: IWeatherCacheRepository,
    private readonly locationRepository: ILocationRepository,
    private readonly weatherApiService: IWeatherServiceApi
  ) {}

  public async getCurrentWeather(location: string): Promise<WeatherCurrentDTO> {
    const locationEntity = await this.getCoordinatesFromLocality(location);
    //Busca o clima no cache memory
    let weather = await this.cacheRepository.getCurrent(
      locationEntity.lat,
      locationEntity.lon
    );
    //Busca o clima da api externa
    if(!weather) {
      weather = await this.weatherApiService.getCurrentWeather(
        locationEntity.lat, 
        locationEntity.lon
      );
      await this.cacheRepository.setCurrent(
        locationEntity.lat, 
        locationEntity.lon, 
        weather
      );
    }
    return this.toCurrentDTO(weather, locationEntity.name);
  }

  private toCurrentDTO(
    entity: CurrentWeather,
    cidade: string
  ): WeatherCurrentDTO {
    return {
      localidade: cidade,
      temperatura: entity.temperature,
      sensacaoTermica: entity.apparentTemperature,
      humidadeRelativa: entity.relativeHumidity,
      descricao: this.getWeatherDescription(entity.weatherCode),
    }
  }

  private async getCoordinatesFromLocality(location: string) {
    const loc = await this.locationRepository.getBySlug(location);
    if (!loc) throw new NotFoundException("Localidade não encontrada");
    return loc;
  }

  private getWeatherDescription(weatherCode: number): string {
    return weatherCodeMap[weatherCode];
  }
}

export { WeatherService }
