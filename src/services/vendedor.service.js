import prisma from "../config/prisma.js";

export const getIncidenciasVendedor = async (vendedorId) => {

    return await prisma.incidencia.findMany({
        where: {
            pedido: {
                vendedorId: vendedorId
            }
        },
        include: {
            usuario: true,
            pedido: true,
            estadoIncidencia: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};
export const crearSolicitud = async (
    usuarioId,
    motivo
) => {

    const pendiente =
        await prisma.estadoSolicitud.findFirst({
            where: {
                nombre: "PENDIENTE"
            }
        });

    return await prisma.solicitudVendedor.create({
        data: {
            usuarioId,
            estadoSolicitudId: pendiente.id,
            motivo
        }
    });
};