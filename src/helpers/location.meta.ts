export interface PaginationMeta {
  page: number;        // página atual
  limit: number;       // número de itens por página
  totalItems: number;  // total de itens encontrados
  totalPages: number;  // total de páginas disponíveis
  provincia?: string;  // filtro opcional (se pesquisa for por província)
}
