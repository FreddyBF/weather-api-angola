import { LocationDto } from "../dtos/location.dto";
import { NotFoundException } from "../errors/not-found.exception";
import { ILocationRepository } from "../repositories/location/ILocation.repository";
class LocationService {
  constructor(private readonly repo: ILocationRepository) {}

  public async listLocations(
    filter?: { provincia?: string }
  ): Promise<LocationDto[]> {
    
    const locationEntity = await this.repo.list(filter);
      const list = locationEntity.map((location) => {
        return {
          id: location.id,
          nome: location.name,
          slug: location.slug,
          provincia: location.province,
        }
      });
    return list;
  }

  public async getLocationById(id: number): Promise<LocationDto> {
    const location = await this.repo.getById(id);
    if (!location) throw new NotFoundException(`Localidade com ID ${id} não encontrada`);
    return {
      id: location.id,
      nome: location.name,
      slug: location.slug,
      provincia: location.province
    };
  }
}

export { LocationService }
