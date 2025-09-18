import Redis from "ioredis";
import { env } from "./env";

const redis = new Redis({
  host: env.redisHost,
  port: env.redisPort,
  username: env.redisUserName,
  password: env.redisPassword,
  lazyConnect: true
});

redis.on("connect", () => console.log("Redis conectado ✅"));
redis.on("error", (err) => console.error("Redis erro ❌:", err));

export async function initRedis() {
  if (!redis.status || redis.status === "end") {
    await redis.connect();
  }
  return redis;
}

export default redis;
