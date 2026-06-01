import prisma from "../config/prisma.js";

export const crearResena = async (req, res) => {

    try {

        const usuarioId = req.user.id;
        const { productoId, estrellas, comentario } = req.body;

        const resena = await prisma.resena.create({
            data: {
                productoId: Number(productoId),
                usuarioId,
                estrellas: Number(estrellas),
                comentario
            }
        });

        return res.status(201).json({
            success: true,
            data: resena
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const listarResenasProducto = async (req, res) => {

    try {

        const { productoId } = req.params;

        const resenas = await prisma.resena.findMany({
            where: {
                productoId: Number(productoId)
            },
            include: {
                usuario: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.json({
            success: true,
            data: resenas
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};