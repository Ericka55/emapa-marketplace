import prisma from "../config/prisma.js";
import { pedidosPorVendedor } from "../services/pedidoVendedor.service.js";

// 📦 listar pedidos vendedor
export const listar = async (req, res) => {

    try {

        const vendedor = await prisma.vendedor.findUnique({
            where: {
                usuarioId: req.user.id
            }
        });

        if (!vendedor) {
            return res.status(404).json({
                success: false,
                message: "No eres vendedor"
            });
        }

        const pedidos = await pedidosPorVendedor(vendedor.id);

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