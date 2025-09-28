import app from "./app";
import { initRedis } from "./config/redis";
import { env } from "./config/env";

const PORT = env.port;

export async function startServer() {
  try {
    const redisClient = await initRedis();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
    });

    return { redisClient }; // útil para testes e shutdown controlado
  } catch (err) {
    console.error("Falha ao inicializar servidor:", err);
    process.exit(1);
  }
}
startServer();
