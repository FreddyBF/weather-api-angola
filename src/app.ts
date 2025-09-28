import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import router from "./routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app = express();

// Middlewares
app.use(express.json());

// Logging: mais detalhado em dev, silencioso em produção
if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Swagger: disponível apenas em desenvolvimento
if (env.nodeEnv === "development") {
  const swaggerDocument = YAML.load(path.join(__dirname, "./docs/sweeger.yaml"));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Rotas principais
app.use("/api/v1", router);

// Tratamento global de erros
app.use(globalErrorHandler);

export default app;
