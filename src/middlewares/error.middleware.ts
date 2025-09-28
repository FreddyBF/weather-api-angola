import { Request, Response, NextFunction } from "express";
import { WeatherApiException } from "../errors/weather-api.exception";
import { ResponseBuilder } from "../helpers/respnse.api"; // ajuste o caminho conforme sua estrutura
import { NotFoundException } from "../errors/not-found.exception";


export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erro conhecido (ex: falha na API externa)
  if (err instanceof WeatherApiException) {
    return res.status(502).json(
      ResponseBuilder.erro("Não foi possível obter os dados climáticos no momento.")
    );
  }

  if (err instanceof NotFoundException) {
    res.status(404).json(ResponseBuilder.erro(err.message));
  }

  // Erro genérico ou inesperado
  return res.status(500).json(
    ResponseBuilder.erro("Ocorreu um erro inesperado. Tente novamente mais tarde.")
  );
}

