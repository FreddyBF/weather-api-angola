import { NextFunction, Request, Response } from "express";
import { LocationService } from "../services/location.service";
import { ResponseBuilder } from "../helpers/respnse.api";
import { LocationDto } from "../dtos/location.dto";

export class LocationController {
  constructor(private readonly service: LocationService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    const { provincia } = req.query;
    const filter = {
      provincia: provincia as string
    }
    try {
      const data = await this.service.listLocations(filter);
      res.status(200).
      json(
        ResponseBuilder.sucesso<LocationDto[]>(
          data, "Lista de localidades obtida com sucesso"
        )
      );
    } catch (error: unknown) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await this.service.getLocationById(id);
      res.status(200).
      json(ResponseBuilder.sucesso<LocationDto, null>(
        data, "Localidade obtida com sucesso"
      ));
    } catch (error: unknown) {
      next(error);
    }
  };
}
