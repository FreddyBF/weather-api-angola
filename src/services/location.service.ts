import { ILocationRepository } from "../repositories/location/ILocation.repository";
import { Location } from "@prisma/client";

export class LocationService {
  constructor(private readonly repo: ILocationRepository) {}

  async listLocations(
    filter?: { provincia?: string },
    pagination?: { page: number; limit: number }
  ): Promise<{ total: number; page: number; limit: number; items: Location[] }> {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit;
    const skip = limit ? (page - 1) * limit : undefined;

    const [items, total] = await Promise.all([
      this.repo.list(filter, skip, limit),
      this.repo.count(filter)
    ]);

    return {
      total,
      page,
      limit: limit ?? items.length,
      items
    };
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.repo.getById(id);
    if (!location) throw new Error(`Localidade com ID ${id} não encontrada`);
    return location;
  }

  async getLocationByName(nome: string): Promise<Location> {
    const location = await this.repo.getByName(nome);
    if (!location) throw new Error(`Localidade com nome "${nome}" não encontrada`);
    return location;
  }
}
