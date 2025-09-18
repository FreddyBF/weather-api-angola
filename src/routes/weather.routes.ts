import { Router } from "express";
import { WeatherController } from "../controllers/weather/weather.controller";
import { WeatherService } from "../services/weather.service";
import { WeatherCacheRepository } from "../repositories/weather/implementation/weathercache.repository";
import { LocationRepository } from "../repositories/location/implementation/location.repository";
import { WeatherServiceApi } from "../clients/weather/implementation/weather.service.api";
import { prisma } from "../config/prisma";
const repoCache = new WeatherCacheRepository();
const locoRepo = new LocationRepository(prisma);
const weatherService = new WeatherServiceApi();
const service = new WeatherService(repoCache,locoRepo, weatherService);
const weatherController = new WeatherController(service);

const weatherRoute = Router();

weatherRoute.get("/atual/:localidade", (req, res, next) =>
  weatherController.getCurrent(req, res, next)
);

weatherRoute.get("/previsao/:localidade", (req, res, next) =>
  weatherController.getForecast7d(req, res, next)
);

export default weatherRoute;
