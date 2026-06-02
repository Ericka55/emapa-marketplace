import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // ESTADOS DE SOLICITUD
  await prisma.estadoSolicitud.createMany({
    data: [
      { nombre: "PENDIENTE" },
      { nombre: "APROBADO" },
      { nombre: "RECHAZADO" }
    ],
    skipDuplicates: true
  });

  console.log("Estados de solicitud creados");

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });