import redis from "../../../config/redis";
import { env } from "../../../config/env";
import { CurrentWeather, CurrentWeatherProps } from "../../../entities/WeatherCurrent.entity";
import { IWeatherCacheRepository } from "../IWeatherCache.repository";

export class WeatherCacheRepository implements IWeatherCacheRepository {

  async getCurrent(latitude: number, longitude: number): Promise<CurrentWeather | null> {
    const key = this.buildKey(latitude, longitude, "current");
    const cached = await this.get<CurrentWeatherProps>(key);
    return cached
      ? CurrentWeather.restore(cached)
      : null;
  }


  async setCurrent(latitude: number, longitude: number, value: CurrentWeather): Promise<void> {
    const key = this.buildKey(latitude, longitude, "current");
    await this.set(
      key, 
      CurrentWeather.toJson(value), 
      env.cacheTtlCurrent
    );
  }
  
  private async get<T>(key: string): Promise<T | null> {
    await this.ensureConnection();
    const raw = await redis.get(key);
    //Retorna um obejecto JS
    return raw ? JSON.parse(raw) as T : null;
  }

  private async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    await this.ensureConnection();
    await redis.set(
      key, 
      JSON.stringify(value), 
      "EX", 
      ttlSeconds
    );
  }

  /**
   * Monta chave padronizada de cache
   * Exemplo: weather:lat:-8.838:lon:13.2344:current
   */
  private buildKey(latitude: number, longitude: number, type: string): string {
    return `
    weather:lat:${latitude.toFixed(4)}: lon:${longitude.toFixed(4)}:${type}
    `;
  }

  /**
   * Garante conexão ativa com Redis
   */
  private async ensureConnection(): Promise<void> {
    switch (redis.status) {
      case "ready":
        return;

      case "end":
       // console.warn("[WeatherCacheRepository] Redis desconectado. Tentando reconectar...");
        await redis.connect();
        return;

      case "connecting":
        //console.log("[WeatherCacheRepository] Aguardando conexão com Redis...");
        await new Promise<void>((resolve, reject) => {
          redis.once("ready", resolve);
          redis.once("error", reject);
        });
        return;

      case "wait":
        //console.log("[WeatherCacheRepository] Iniciando conexão com Redis...");
        await redis.connect();
        return;
    }
  }
}



