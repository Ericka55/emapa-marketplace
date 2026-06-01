import prisma from "../config/prisma.js";

export const agregarAlCarrito = async (
    usuarioId,
    productoId,
    cantidad
) => {

    let carrito =
        await prisma.carrito.findFirst({
            where: {
                usuarioId,
                activo: true
            }
        });

    if (!carrito) {

        carrito =
            await prisma.carrito.create({
                data: {
                    usuarioId
                }
            });

    }

    const existente =
        await prisma.carritoDetalle.findFirst({
            where: {
                carritoId: carrito.id,
                productoId
            }
        });

    if (existente) {

        return await prisma.carritoDetalle.update({
            where: {
                id: existente.id
            },
            data: {
                cantidad:
                    existente.cantidad + cantidad
            }
        });

    }

    return await prisma.carritoDetalle.create({
        data: {
            carritoId: carrito.id,
            productoId,
            cantidad
        }
    });

};

export const obtenerCarrito = async (
    usuarioId
) => {

    return await prisma.carrito.findFirst({
        where: {
            usuarioId,
            activo: true
        },
        include: {
            detalles: {
                include: {
                    producto: {
                        include: {
                            imagenes: true,
                            categoria: true
                        }
                    }
                }
            }
        }
    });

};
export const checkoutCarrito = async (
    usuarioId,
    metodoPagoId,
    direccionEntrega,
    telefonoContacto
) => {

    const carrito =
        await prisma.carrito.findFirst({
            where: {
                usuarioId,
                activo: true
            },
            include: {
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });

    if (!carrito || carrito.detalles.length === 0) {
        throw new Error("Carrito vacío");
    }

    const estadoPedido =
        await prisma.estadoPedido.findFirst({
            where: {
                nombre: "PENDIENTE"
            }
        });

    let total = 0;

    carrito.detalles.forEach(item => {
        total += Number(item.producto.precio) * item.cantidad;
    });

    const pedido = await prisma.pedido.create({
        data: {
            compradorId: usuarioId,
            vendedorId: carrito.detalles[0].producto.vendedorId,
            estadoPedidoId: estadoPedido.id,
            total,
            direccionEntrega,
            telefonoContacto
        }
    });

    await prisma.detallePedido.createMany({
        data: carrito.detalles.map(item => ({
            pedidoId: pedido.id,
            productoId: item.productoId,
            cantidad: item.cantidad,
            precioUnitario: item.producto.precio
        }))
    });

    const pago = await prisma.pago.create({
        data: {
            pedidoId: pedido.id,
            metodoPagoId,
            monto: total,
            estado: "PENDIENTE"
        }
    });

    await prisma.carrito.update({
        where: {
            id: carrito.id
        },
        data: {
            activo: false
        }
    });

    return {
        pedido,
        pago
    };
};