import prisma from "../config/prisma.js";

export const crearPedido = async (data) => {

    const pedido = await prisma.pedido.create({
        data: {
            compradorId: data.compradorId,
            vendedorId: data.vendedorId,
            estadoPedidoId: 1,
            total: data.total,
            direccionEntrega: data.direccionEntrega,
            telefonoContacto: data.telefonoContacto,

            detalles: {
                create: data.productos.map(p => ({
                    productoId: p.id,
                    cantidad: p.quantity,
                    precioUnitario: p.precio
                }))
            }
        }
    });

    return pedido;
};