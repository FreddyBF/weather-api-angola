import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../services/weather.service";
import { ResponseBuilder } from "../helpers/respnse.api";
import { ClimaMeta } from "../helpers/weather.meta";
import { WeatherCurrentDTO } from "../dtos/weather-current.dto";
export class WeatherController {
  constructor(private readonly service: WeatherService) {}

  getCurrent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { localidade } = req.params;
      const data = await this.service.getCurrentWeather(localidade);
      const meta: ClimaMeta = {
        temp: "°C",
        humidade: "%",
        sensacao: "°C",
      };
      res.status(200).
      json(
        ResponseBuilder.sucesso<WeatherCurrentDTO, ClimaMeta>(
          data, 
          "Clima actual obtido com sucesso",
          meta
        )
      );
    } catch (error) {
      next(error);
    }
  };
}
