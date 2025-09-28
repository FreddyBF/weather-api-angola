export interface WeatherCurrentDTO {
  localidade: string;         // Nome da cidade 
  temperatura: number;     // °C
  sensacaoTermica: number;      
  humidadeRelativa: number;   
  descricao: string;       // descrição em português do código WMO
}


