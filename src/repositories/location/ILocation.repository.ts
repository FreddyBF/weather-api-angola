import { Location } from "@prisma/client";

export interface ILocationRepository {
  /**
   * Lista localidades com filtro opcional por província e suporte a paginação
   * @param filter Filtro opcional por província
   * @param skip Quantidade de registros a pular (para paginação)
   * @param take Quantidade máxima de registros a retornar (para paginação)
   */
  list(
    filter?: { provincia?: string },
    skip?: number,
    take?: number
  ): Promise<Location[]>;

  /**
   * Conta o total de localidades com filtro opcional por província
   * @param filter Filtro opcional por província
   */
  count(filter?: { provincia?: string }): Promise<number>;

  /**
   * Busca uma localidade pelo ID
   */
  getById(id: number): Promise<Location | null>;

  /**
   * Busca uma localidade pelo nome
   */
  getByName(nome: string): Promise<Location | null>;

  /**
   * Busca uma localidade por província e nome
   */
  getByProvinceAndName(provincia: string, nome: string): Promise<Location | null>;
}

