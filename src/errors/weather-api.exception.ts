
export class WeatherApiException extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "WeatherApiException";
    Object.setPrototypeOf(this, WeatherApiException.prototype);
  }
}
