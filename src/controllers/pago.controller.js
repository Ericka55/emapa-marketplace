import {
    crearPago,
    obtenerPagoPorPedido,
    marcarPagado
} from "../services/pago.service.js";

// ➕ crear pago
export const crear = async (req, res) => {

    try {

        const pago = await crearPago(req.body);

        return res.status(201).json({
            success: true,
            data: pago
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 📄 obtener pago por pedido
export const obtener = async (req, res) => {

    try {

        const pago = await obtenerPagoPorPedido(req.params.pedidoId);

        return res.json({
            success: true,
            data: pago
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ pagar (simulación tipo Amazon)
export const pagar = async (req, res) => {

    try {

        const pago = await marcarPagado(req.params.id);

        return res.json({
            success: true,
            message: "Pago confirmado",
            data: pago
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};