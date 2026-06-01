import prisma from "../config/prisma.js";

// ➕ crear pago
export const crearPago = async (data) => {

    return await prisma.pago.create({
        data: {
            pedidoId: data.pedidoId,
            metodoPagoId: data.metodoPagoId,
            monto: data.monto,
            estado: "PENDIENTE",
            fechaPago: null
        }
    });
};

// 📄 obtener pago por pedido
export const obtenerPagoPorPedido = async (pedidoId) => {

    return await prisma.pago.findFirst({
        where: {
            pedidoId: Number(pedidoId)
        },
        include: {
            metodoPago: true,
            pedido: true
        }
    });
};

// ✅ marcar como pagado (SIMULACIÓN REAL)
export const marcarPagado = async (pagoId) => {

    return await prisma.pago.update({
        where: {
            id: Number(pagoId)
        },
        data: {
            estado: "PAGADO",
            fechaPago: new Date()
        }
    });
};