import { Router } from "express";
import { WeatherController } from "../controllers/weather.controller";
import { WeatherService } from "../services/weather.service";
import { WeatherCacheRepository } from "../repositories/weather/implementation/weathercache.repository";
import { LocationRepository } from "../repositories/location/implementation/location.repository";
import { WeatherServiceApi } from "../clients/weather/implementation/weather.service.api";
import { prisma } from "../config/prisma";
const cacheRepository = new WeatherCacheRepository();
const locationRepository = LocationRepository.create(prisma);
const weatherService = new WeatherServiceApi();

const service = new WeatherService(
  cacheRepository,
  locationRepository,
  weatherService
);
const weatherController = new WeatherController(service);

const weatherRoute = Router();
weatherRoute.get("/:localidade", (req, res, next) =>
  weatherController.getCurrent(req, res, next)
);
export default weatherRoute;
