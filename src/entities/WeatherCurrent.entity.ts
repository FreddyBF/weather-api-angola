import { randomUUID } from 'crypto';

export type CurrentWeatherProps = {
    id: string;
    temperature: number;
    apparentTemperature: number;
    relativeHumidity: number;
    weatherCode: number;
};

export class CurrentWeather {
    private constructor(
        private readonly props: CurrentWeatherProps
    ) {}

    public static create( 
        temperature: number, 
        apparentTemperature: number, 
        relativeHumidity: number, 
        weatherCode: number,
    ): CurrentWeather {
        return new CurrentWeather({
            id: randomUUID(), 
            temperature: temperature,
            apparentTemperature: apparentTemperature,
            relativeHumidity: relativeHumidity,
            weatherCode: weatherCode,
        });
    }

    public static restore(
      props: CurrentWeatherProps
    ): CurrentWeather {
        return new CurrentWeather(props);
    }

    public get id() { 
        return this.props.id; 
    }

    public get temperature() { 
        return this.props.temperature; 
    }

    public get apparentTemperature() { 
        return this.props.apparentTemperature; 
    }

    public get relativeHumidity() { 
        return this.props.relativeHumidity; 
    }

    public get weatherCode() { 
        return this.props.weatherCode; 
    }

    public static toJson(weather: CurrentWeather){
        return {
            id: weather.id,
            temperature: weather.temperature,
            apparentTemperature: weather.apparentTemperature,
            relativeHumidity: weather.relativeHumidity,
            weatherCode: weather.weatherCode,
        }
    }
}