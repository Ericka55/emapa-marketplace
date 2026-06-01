import prisma from "../config/prisma.js";

// 📦 pedidos por vendedor
export const pedidosPorVendedor = async (vendedorId) => {

    return await prisma.pedido.findMany({
        where: {
            vendedorId: Number(vendedorId)
        },
        include: {
            comprador: true,
            estadoPedido: true,
            detalles: {
                include: {
                    producto: true
                }
            },
            pagos: true
        },
        orderBy: {
            fechaPedido: "desc"
        }
    });
};