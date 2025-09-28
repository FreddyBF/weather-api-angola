export interface ApiResponse<T, M = undefined> {
  sucesso: boolean;        // true ou false
  mensagem?: string;       // mensagem opcional
  dados?: T;               // payload genérico
  erros?: string[];        // lista de mensagens de erro
  meta?: M;                // metadados adicionais (ex.: unidades, paginação, etc.)
}

export class ResponseBuilder {
  static sucesso<T, M = undefined >(dados: T, mensagem?: string, meta?: M): ApiResponse<T, M> {
    return {
      sucesso: true,
      mensagem,
      dados,
      meta
    };
  }

  static erro(mensagem: string, erros?: string[]): ApiResponse<null> {
    return {
      sucesso: false,
      mensagem,
      erros
    };
  }
}

