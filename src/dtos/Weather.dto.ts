export interface WeatherDTO {
  cidade: string;             // Nome da cidade (opcional, pois a API não retorna diretamente)
  temperatura: number;         // Temperatura em °C
  vento: number;                // Velocidade do vento em km/h
  direcaoVento: number;         // Direção do vento em graus (0-360)
  ehDia: boolean;               // true = dia, false = noite
  descricao?: string;           // Descrição textual da condição (mapeada a partir do código WMO)
}
 
