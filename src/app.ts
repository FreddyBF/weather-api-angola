import express from "express";
import morgan from 'morgan';
//import weatherRoutes from "./routes/weather.routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import router from "./routes/route";
const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Carregar o arquivo YAML
const swaggerDocument = YAML.load(path.join(__dirname, "./docs/sweeger.yaml"));

// Rota da documentação
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", router);

export default app;
