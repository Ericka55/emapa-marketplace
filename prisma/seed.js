import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.estadoPedido.createMany({
    data: [
      { nombre: "PENDIENTE" },
      { nombre: "CONFIRMADO" },
      { nombre: "ENVIADO" },
      { nombre: "ENTREGADO" },
      { nombre: "CANCELADO" }
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