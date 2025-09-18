import app from "./app";
import { initRedis } from "./config/redis"; // importa o inicializador que criamos

const PORT = 3000;

async function startServer() {
  try {
    await initRedis();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
    });
  } catch (err) {
    console.error("Falha ao inicializar servidor:", err);
    process.exit(1);
  }
}

startServer();
