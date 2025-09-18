export interface WeatherDailyForecastDTO {
  data: string;            // YYYY-MM-DD
  tempMax: number;         // °C
  tempMin: number;         // °C
  precipitacao: number;    // mm
  ventoMax: number;        // km/h
  nascerDoSol: string;     // ISO 8601
  porDoSol: string;        // ISO 8601
}
