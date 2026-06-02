import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.categoria.createMany({
  data: [
    { nombre: "Granos", descripcion: "Arroz, trigo, maíz" },
    { nombre: "Frutas", descripcion: "Frutas frescas" },
    { nombre: "Verduras", descripcion: "Hortalizas y verduras" },
    { nombre: "Lácteos", descripcion: "Leche, queso, yogurt" }
  ],
  skipDuplicates: true
});
await prisma.estadoIncidencia.createMany({
  data: [
    { nombre: "PENDIENTE" },
    { nombre: "EN_REVISION" },
    { nombre: "RESUELTO" },
    { nombre: "RECHAZADO" }
  ],
  skipDuplicates: true
});
await prisma.metodoPago.createMany({
  data: [
    { nombre: "EFECTIVO" },
    { nombre: "QR" },
    { nombre: "TARJETA" },
    { nombre: "TRANSFERENCIA" }
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