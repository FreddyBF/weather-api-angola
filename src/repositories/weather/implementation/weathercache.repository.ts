import redis from "../../../config/redis";
import { env } from "../../../config/env";
import { WeatherCurrent } from "../../../entities/WeatherCurrent.entity";
import { WeatherDailyForecast } from "../../../entities/WeatherDailyForecast.entity";
import { IWeatherCacheRepository } from "../IWeatherCache.repository";

export class WeatherCacheRepository implements IWeatherCacheRepository {


  async getCurrent(latitude: number, longitude: number): Promise<WeatherCurrent | null> {
  const data = await this.get<any>(this.buildKey(latitude, longitude, "current"));
  return data ? WeatherCurrent.fromJSON(data) : null;
}


  async setCurrent(
    latitude: number, 
    longitude: number, 
    value: WeatherCurrent
  ): Promise<void> {
    return this.set(
      this.buildKey(latitude, longitude, "current"), 
      value, 
      env.cacheTtlCurrent
    );
  }


  async getForecast7d(latitude: number, longitude: number): Promise<WeatherDailyForecast[] | null> {
    return this.get<any>(this.buildKey(latitude, longitude, "forecast7d"));
    
  }

  
  async setForecast7d(latitude: number, longitude: number, value: WeatherDailyForecast[]): Promise<void> {
    return this.set(this.buildKey(latitude, longitude, "forecast7d"), value, env.cacheTtlForecast7d);
  }

  
  private async get<T>(key: string): Promise<T | null> {
    await this.ensureConnection();
    const data = await redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }
  
  private async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    await this.ensureConnection();
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  }

  /**
   * Monta a chave de cache padronizada
   */
  private buildKey(
    latitude: number, 
    longitude: number, 
    type: string
  ): string {
    //chave -- > weather:-8.8383,13.2344:current " valor --> {...JSON do clima atual...}"
    return `weather:${latitude.toFixed(4)},${longitude.toFixed(4)}:${type}`;
  }

  /**
   * Garante que a conexão com o Redis esteja activa
   */
  private async ensureConnection(): Promise<void> {
    if (redis.status === "ready") return;

    if (redis.status === "end") {
      console.warn("[WeatherCacheRepository] Redis desconectado. Tentando reconectar...");
      await redis.connect();
      return;
    }

    if (redis.status === "connecting") {
      console.log("[WeatherCacheRepository] Aguardando conexão com Redis...");
      await new Promise<void>((resolve, reject) => {
        redis.once("ready", resolve);
        redis.once("error", reject);
      });
      return;
    }

    if (redis.status === "wait") {
      console.log("[WeatherCacheRepository] Iniciando conexão com Redis...");
      await redis.connect();
    }
  }
}



