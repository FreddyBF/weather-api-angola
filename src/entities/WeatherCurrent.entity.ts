export class WeatherCurrent {
  constructor(
    private _temperatura: number,     // °C
    private _vento: number,           // km/h
    private _direcaoVento: number,    // graus
    private _ehDia: boolean,          // true = dia, false = noite
    private _descricao?: string,      // mapeada via weathercode
    private _cidade?: string          // opcional, preenchida internamente
  ) {}

  // Getters e setters...
  get temperatura() { return this._temperatura; }
  set temperatura(v: number) { this._temperatura = v; }

  get vento() { return this._vento; }
  set vento(v: number) { this._vento = v; }

  get direcaoVento() { return this._direcaoVento; }
  set direcaoVento(v: number) { this._direcaoVento = v; }

  get ehDia() { return this._ehDia; }
  set ehDia(v: boolean) { this._ehDia = v; }

  get descricao() { return this._descricao; }
  set descricao(v: string | undefined) { this._descricao = v; }

  get cidade() { return this._cidade; }
  set cidade(v: string | undefined) { this._cidade = v; }
    /**
   * Retorna um objeto literal pronto para serializar no Redis
   */
    toJSON() {
        return {
          temperatura: this.temperatura,
          vento: this.vento,
          direcaoVento: this.direcaoVento,
          ehDia: this.ehDia,
          descricao: this.descricao,
          cidade: this.cidade
        };
    }

  /**
   * Método auxiliar para reconstruir a entidade a partir de um objeto literal
   */
    static fromJSON(data: any): WeatherCurrent {
        return new WeatherCurrent(
          data.temperatura,
          data.vento,
          data.direcaoVento,
          data.ehDia,
          data.descricao,
          data.cidade
        );
    }
}
