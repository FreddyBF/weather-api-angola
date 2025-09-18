
export interface ApiResponse<T> {
  sucesso: boolean;       // true ou false
  mensagem?: string;      // mensagem opcional (ex.: "Operação realizada com sucesso")
  dados?: T;              // payload genérico
  erros?: string[];       // lista de mensagens de erro
}

export class ResponseBuilder {
  static sucesso<T>(dados: T, mensagem?: string): ApiResponse<T> {
    return {
      sucesso: true,
      mensagem,
      dados
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
