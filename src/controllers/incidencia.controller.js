import prisma from "../config/prisma.js";

export const crearIncidencia = async (req, res) => {
    try {

        const { pedidoId, descripcion } = req.body;

        const incidencia = await prisma.incidencia.create({
            data: {
                usuarioId: req.user.id,
                pedidoId,
                estadoIncidenciaId: 1,
                descripcion
            }
        });

        res.json({
            success: true,
            data: incidencia
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const misIncidencias = async (req, res) => {

    const data = await prisma.incidencia.findMany({
        where: {
            usuarioId: req.user.id
        },
        include: {
            pedido: true
        }
    });

    res.json({ success: true, data });
};

export const incidenciasVendedor = async (req, res) => {

    const vendedor = await prisma.vendedor.findUnique({
        where: { usuarioId: req.user.id }
    });

    const data = await prisma.incidencia.findMany({
        where: {
            pedido: {
                vendedorId: vendedor.id
            }
        },
        include: {
            pedido: true,
            usuario: true
        }
    });

    res.json({ success: true, data });
};

export const todasIncidencias = async (req, res) => {

    const data = await prisma.incidencia.findMany({
        include: {
            pedido: true,
            usuario: true
        }
    });

    res.json({ success: true, data });
};
export const listarIncidenciasUsuario = async (req, res) => {

    try {

        const data = await prisma.incidencia.findMany({
            where: {
                usuarioId: req.user.id
            },
            include: {
                pedido: true
            }
        });

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