import prisma from "../config/prisma.js";
import {
    getDashboardStats,
    obtenerSolicitudes,
    rechazarSolicitud,
    getIncidenciasStats,
    getAllIncidencias
} from "../services/admin.service.js";

/* =========================
   INCIDENCIAS LISTA
========================= */
export const listarIncidenciasAdmin = async (req, res) => {
    try {
        const data = await getAllIncidencias();

        return res.json({
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* =========================
   DASHBOARD ADMIN
========================= */
export const dashboard = async (req, res) => {
    try {
        const stats = await getDashboardStats();

        return res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* =========================
   LISTAR SOLICITUDES
========================= */
export const listarSolicitudes = async (req, res) => {
    try {
        const solicitudes = await obtenerSolicitudes();

        return res.json({
            success: true,
            data: solicitudes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* =========================
   APROBAR SOLICITUD
========================= */
export const aprobar = async (req, res) => {
    try {

        const solicitudId = Number(req.params.id);

        const solicitud = await prisma.solicitudVendedor.findUnique({
            where: { id: solicitudId }
        });

        if (!solicitud) {
            return res.status(404).json({
                success: false,
                message: "Solicitud no encontrada"
            });
        }

        const estadoAprobado = await prisma.estadoSolicitud.findFirst({
            where: { nombre: "APROBADO" }
        });

        // 1. actualizar solicitud
        await prisma.solicitudVendedor.update({
            where: { id: solicitudId },
            data: {
                estadoSolicitudId: estadoAprobado.id
            }
        });

        // 2. cambiar rol usuario
        await prisma.usuario.update({
            where: { id: solicitud.usuarioId },
            data: {
                rol: "VENDEDOR",
                estado: "ACTIVO" 
            }
        });

        // 3. crear vendedor SOLO si no existe
        const existe = await prisma.vendedor.findUnique({
            where: { usuarioId: solicitud.usuarioId }
        });

        if (!existe) {
            await prisma.vendedor.create({
                data: {
                    usuarioId: solicitud.usuarioId,
                    negocio: "Mi tienda",
                    descripcion: "Vendedor registrado"
                }
            });
        }

        return res.json({
            success: true,
            message: "Solicitud aprobada correctamente"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
/* =========================
   RECHAZAR SOLICITUD
========================= */
export const rechazar = async (req, res) => {
    try {
        const solicitudId = Number(req.params.id);

        let estadoRechazado = await prisma.estadoSolicitud.findFirst({
            where: { nombre: "RECHAZADO" }
        });

        if (!estadoRechazado) {
            estadoRechazado = await prisma.estadoSolicitud.create({
                data: { nombre: "RECHAZADO" }
            });
        }

        await prisma.solicitudVendedor.update({
            where: { id: solicitudId },
            data: {
                estadoSolicitudId: estadoRechazado.id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Solicitud rechazada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* =========================
   DASHBOARD INCIDENCIAS
========================= */
export const incidenciasDashboard = async (req, res) => {
    try {
        const stats = await getIncidenciasStats();

        return res.json({
            success: true,
            data: stats
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};