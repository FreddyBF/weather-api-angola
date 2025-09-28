import { PrismaClient } from "@prisma/client";
import { locations } from "./locations";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding locations...");

  await Promise.all(
  locations.map((loc) => {
    const slug = slugify(loc.nome);
    return prisma.location.upsert({
      where: { slug },
      update: {
        name: loc.nome,
        province: loc.provincia,
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
      create: {
        name: loc.nome,
        slug,
        province: loc.provincia,
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
    });
  })
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



export function slugify(text: string): string {
  return text
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

