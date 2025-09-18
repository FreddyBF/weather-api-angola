export function respostaSucesso<T>(mensagem: string, dados: T) {
  return {
    sucesso: true,
    mensagem,
    dados,
    timestamp: new Date().toISOString()
  };
}

export function respostaErro(codigo: string, mensagem: string, detalhes?: string) {
  return {
    sucesso: false,
    mensagem,
    erro: {
      codigo,
      detalhes
    },
    timestamp: new Date().toISOString()
  };
}
