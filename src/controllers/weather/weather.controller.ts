import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../../services/weather.service";

export class WeatherController {
  constructor(private readonly service: WeatherService) {}

  getCurrent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { localidade } = req.params;
      const data = await this.service.getCurrentByLocality(localidade);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  getForecast7d = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { localidade } = req.params;
      const data = await this.service.getForecast7dByLocality(localidade);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}
