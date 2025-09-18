import { PrismaClient } from "@prisma/client";
import { locations } from "../src/data/locations";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding locations...");
  await Promise.all(
    locations.map((loc) =>
      prisma.location.upsert({
        where: { nome: loc.nome }, 
        update: {
          provincia: loc.provincia,
          latitude: loc.latitude,
          longitude: loc.longitude
        },
        create: {
          nome: loc.nome,
          provincia: loc.provincia,
          latitude: loc.latitude,
          longitude: loc.longitude
        }
      })
    )
  );
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error("Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
