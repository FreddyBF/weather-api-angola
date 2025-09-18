import { PrismaClient, Location } from "@prisma/client";
import { ILocationRepository } from "../ILocation.repository";

export class LocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Lista localidades com filtro opcional por província e suporte a paginação
   */
  async list(
    filter?: { provincia?: string },
    skip?: number,
    take?: number
  ): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: filter?.provincia
        ? { provincia: { equals: filter.provincia } }
        : undefined,
      orderBy: [{ provincia: "asc" }, { nome: "asc" }],
      skip,
      take
    });
  }

  /**
   * Conta o total de localidades com filtro opcional por província
   */
  async count(filter?: { provincia?: string }): Promise<number> {
    return this.prisma.location.count({
      where: filter?.provincia
        ? { provincia: { equals: filter.provincia } }
        : undefined
    });
  }

  /**
   * Busca uma localidade pelo ID
   */
  async getById(id: number): Promise<Location | null> {
    return this.prisma.location.findUnique({ where: { id } });
  }

  /**
   * Busca uma localidade pelo nome
   */
  async getByName(nome: string): Promise<Location | null> {
    return this.prisma.location.findFirst({
      where: { nome: { equals: nome } }
    });
  }

  /**
   * Busca uma localidade por província e nome
   */
  async getByProvinceAndName(provincia: string, nome: string): Promise<Location | null> {
    return this.prisma.location.findFirst({
      where: {
        provincia: { equals: provincia },
        nome: { equals: nome }
      }
    });
  }
}
