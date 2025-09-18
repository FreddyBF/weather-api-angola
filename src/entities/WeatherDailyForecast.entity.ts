export class WeatherDailyForecast {
  constructor(
    private _data: string,            // YYYY-MM-DD
    private _tempMax: number,         // °C
    private _tempMin: number,         // °C
    private _precipitacao: number,    // mm
    private _ventoMax: number,        // km/h
    private _nascerDoSol: string,     // ISO 8601
    private _porDoSol: string ,        // ISO 8601
    private _cididade?: string,
  ) {}

  // Getters e setters...
  get data() { return this._data; }
  set data(v: string) { this._data = v; }

  get cidade() { return this._cididade}
  set cidade(v) { this._cididade = this.cidade}

  get tempMax() { return this._tempMax; }
  set tempMax(v: number) { this._tempMax = v; }

  get tempMin() { return this._tempMin; }
  set tempMin(v: number) { this._tempMin = v; }

  get precipitacao() { return this._precipitacao; }
  set precipitacao(v: number) { this._precipitacao = v; }

  get ventoMax() { return this._ventoMax; }
  set ventoMax(v: number) { this._ventoMax = v; }

  get nascerDoSol() { return this._nascerDoSol; }
  set nascerDoSol(v: string) { this._nascerDoSol = v; }

  get porDoSol() { return this._porDoSol; }
  set porDoSol(v: string) { this._porDoSol = v; }
}
