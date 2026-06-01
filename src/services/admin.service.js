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
export const getDashboardStats = async () => {

    const usuarios = await prisma.usuario.count();
    const vendedores = await prisma.vendedor.count();
    const productos = await prisma.producto.count();
    const pedidos = await prisma.pedido.count();

    const ingresos = await prisma.pago.aggregate({
        _sum: {
            monto: true
        },
        where: {
            estado: "PAGADO"
        }
    });

    const pedidosPendientes = await prisma.pedido.count({
        where: {
            estadoPedido: {
                nombre: "PENDIENTE"
            }
        }
    });

    const pedidosEnviados = await prisma.pedido.count({
        where: {
            estadoPedido: {
                nombre: "ENVIADO"
            }
        }
    });

    const topProductos = await prisma.detallePedido.groupBy({
        by: ["productoId"],
        _sum: {
            cantidad: true
        },
        orderBy: {
            _sum: {
                cantidad: "desc"
            }
        },
        take: 5
    });

    return {
        usuarios,
        vendedores,
        productos,
        pedidos,
        ingresosTotales: ingresos._sum.monto || 0,
        pedidosPendientes,
        pedidosEnviados,
        topProductos
    };
};
export const obtenerSolicitudes = async () => {

    return await prisma.solicitudVendedor.findMany({
        include: {
            usuario: true,
            estadoSolicitud: true,
            documentos: true
        },
        orderBy: {
            fechaSolicitud: "desc"
        }
    });

};
export const aprobarSolicitud = async (
    solicitudId
) => {

    const solicitud =
        await prisma.solicitudVendedor.findUnique({
            where: {
                id: Number(solicitudId)
            },
            include: {
                usuario: true
            }
        });

    if (!solicitud) {
        throw new Error(
            "Solicitud no encontrada"
        );
    }
    if (
    solicitud.estadoSolicitudId !== 1
) {
    throw new Error(
        "La solicitud ya fue procesada"
    );
}

    const aprobada =
        await prisma.estadoSolicitud.findFirst({
            where: {
                nombre: "APROBADA"
            }
        });

    await prisma.solicitudVendedor.update({
        where: {
            id: solicitud.id
        },
        data: {
            estadoSolicitudId: aprobada.id
        }
    });

    await prisma.usuario.update({
        where: {
            id: solicitud.usuarioId
        },
        data: {
            rol: "VENDEDOR"
        }
    });

    await prisma.vendedor.create({
        data: {
            usuarioId: solicitud.usuarioId,
            negocio:
                solicitud.usuario.nombre,
            descripcion:
                "Pendiente actualización"
        }
    });

    return true;
};
export const rechazarSolicitud = async (
    solicitudId
) => {

    const rechazada =
        await prisma.estadoSolicitud.findFirst({
            where: {
                nombre: "RECHAZADA"
            }
        });
const solicitud =
    await prisma.solicitudVendedor.findUnique({
        where: {
            id: Number(solicitudId)
        }
    });

if (!solicitud) {
    throw new Error(
        "Solicitud no encontrada"
    );
}

if (
    solicitud.estadoSolicitudId !== 1
) {
    throw new Error(
        "La solicitud ya fue procesada"
    );
}
    await prisma.solicitudVendedor.update({
        where: {
            id: Number(solicitudId)
        },
        data: {
            estadoSolicitudId:
                rechazada.id
        }
    });

    return true;
};
export const getIncidenciasStats = async () => {

    const total = await prisma.incidencia.count();

    const pendientes = await prisma.incidencia.count({
        where: { estadoIncidenciaId: 1 }
    });

    const enProceso = await prisma.incidencia.count({
        where: { estadoIncidenciaId: 2 }
    });

    const resueltas = await prisma.incidencia.count({
        where: { estadoIncidenciaId: 3 }
    });

    return {
        total,
        pendientes,
        enProceso,
        resueltas
    };
};
export const getAllIncidencias = async () => {

    return await prisma.incidencia.findMany({
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