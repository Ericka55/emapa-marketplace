import prisma from "../config/prisma.js";
import { crearPedido } from "../services/pedido.service.js";

export const misPedidos = async (req, res) => {

    try {

        const usuarioId = req.user.id;

        const pedidos = await prisma.pedido.findMany({
            where: {
                compradorId: usuarioId
            },
            include: {
                detalles: {
                    include: {
                        producto: {
                            include: {
                                imagenes: true
                            }
                        }
                    }
                },
                estadoPedido: true,
                pagos: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.json({
            success: true,
            data: pedidos
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const crear = async (req, res) => {

    try {

        const pedido = await crearPedido(req.body);

        return res.json({
            success: true,
            data: pedido
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};