export interface WeatherCurrentDTO {
  cidade?: string;         // Nome da cidade (opcional)
  temperatura: number;     // °C
  vento: number;           // km/h
  direcaoVento: number;    // graus
  ehDia: boolean;          // true = dia, false = noite
  descricao: string;       // descrição em português do código WMO
}
