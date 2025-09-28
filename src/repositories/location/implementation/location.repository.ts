import { PrismaClient } from "@prisma/client";
import { LocationEntity } from "../../../entities/Location.entity";
import { ILocationRepository } from "../ILocation.repository";

export class LocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static create(prisma: PrismaClient): LocationRepository {
    return new LocationRepository(prisma)
  }

 
  public async list(
    filter?: { provincia?: string },
  ): Promise<LocationEntity[]> {
    const loc = await this.prisma.location.findMany({
      where: filter?.provincia
        ? { province: { equals: filter.provincia } }
        : undefined,
      orderBy: [{ province: "asc" }, { name: "asc" }]
    });

    const locationsList = loc.map((l) => {
      return LocationEntity.restore({
        id: l.id,
        name: l.name,
        slug: l.slug,
        province: l.province,
        lat: l.latitude,
        lon: l.longitude,
      })
    });

    return locationsList;
  }


  public async getById(id: number): Promise<LocationEntity | null> {
    const loc = await this.prisma.location.findUnique({ where: { id } });
    if(!loc) {
      return null;
    }

    return LocationEntity.restore({
      id: loc.id,
      name: loc.name,
      slug: loc.slug,
      province: loc.province,
      lat: loc.latitude,
      lon: loc.longitude,
    });
  }

  async getBySlug(slug: string): Promise<LocationEntity | null> {
     const loc = await this.prisma.location.findFirst({
      where: { slug }
    })
    return LocationEntity.restore({
      id: loc.id,
      name: loc.name,
      slug: loc.slug,
      province: loc.province,
      lat: loc.latitude,
      lon: loc.longitude,
    });
  }

}
