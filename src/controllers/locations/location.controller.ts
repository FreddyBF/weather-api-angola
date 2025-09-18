import { Request, Response } from "express";
import { LocationService } from "../../services/location.service";

export class LocationController {
  constructor(private readonly service: LocationService) {}

  list = async (req: Request, res: Response) => {
    try {
      const { provincia, page, limit } = req.query;

      const data = await this.service.listLocations(
        provincia ? { provincia: String(provincia) } : undefined,
        page && limit
          ? { page: Number(page), limit: Number(limit) }
          : undefined
      );

      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = await this.service.getLocationById(id);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  getByName = async (req: Request, res: Response) => {
    try {
      const { nome } = req.params;
      const data = await this.service.getLocationByName(nome);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}
