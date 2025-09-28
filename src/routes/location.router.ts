import { Router } from "express";
import { LocationController } from "../controllers/location.controller";
import { LocationService } from "../services/location.service";
import { LocationRepository } from "../repositories/location/implementation/location.repository";
import { prisma } from "../config/prisma";

const repo = new LocationRepository(prisma);
const service = new LocationService(repo);
const controller = new LocationController(service);

const locationRouter = Router();
locationRouter.get("/", controller.list);
locationRouter.get("/:id", controller.getById);
export default locationRouter;
