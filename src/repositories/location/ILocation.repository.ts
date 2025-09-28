import { LocationEntity } from "../../entities/Location.entity";

export interface ILocationRepository {
  /**
   * Lista localidades com filtro opcional por província e suporte a paginação
   * @param filter Filtro opcional por província
   * @param skip Quantidade de registros a pular (para paginação)
   * @param take Quantidade máxima de registros a retornar (para paginação)
   */
  list(
    filter?: { provincia?: string },
  ): Promise<LocationEntity[]>;

  /**
   * Busca uma localidade pelo ID
   */
  getById(id: number): Promise<LocationEntity | null>;

  /**
   * Busca uma localidade pelo nome
   */
  getBySlug(slug: string): Promise<LocationEntity | null>;

}

