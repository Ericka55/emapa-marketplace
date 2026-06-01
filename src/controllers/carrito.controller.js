import prisma from "../config/prisma.js";
import {
    agregarAlCarrito,
    obtenerCarrito, checkoutCarrito
} from "../services/carrito.service.js";

export const agregar = async (
    req,
    res
) => {

    try {

        const {
            productoId,
            cantidad
        } = req.body;

        const item =
            await agregarAlCarrito(
                req.user.id,
                Number(productoId),
                Number(cantidad)
            );

        return res.status(201).json({
            success: true,
            data: item
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const verCarrito = async (
    req,
    res
) => {

    try {

        const carrito =
            await obtenerCarrito(
                req.user.id
            );

        return res.status(200).json({
            success: true,
            data: carrito
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}; 
export const checkout = async (
    req,
    res
) => {

    try {

        const {
            metodoPagoId,
            direccionEntrega,
            telefonoContacto
        } = req.body;

        const result =
            await checkoutCarrito(
                req.user.id,
                Number(metodoPagoId),
                direccionEntrega,
                telefonoContacto
            );

        return res.status(201).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
export const actualizarCantidad = async (req, res) => {

    try {

        const usuarioId = req.user.id;
        const { id } = req.params; // carritoDetalleId
        const { accion } = req.body; // "sumar" o "restar"

        const item = await prisma.carritoDetalle.findUnique({
            where: { id: Number(id) },
            include: {
                carrito: true
            }
        });

        if (!item || item.carrito.usuarioId !== usuarioId) {
            return res.status(404).json({
                success: false,
                message: "Item no encontrado"
            });
        }

        let nuevaCantidad = item.cantidad;

        if (accion === "sumar") {
            nuevaCantidad += 1;
        }

        if (accion === "restar") {
            nuevaCantidad -= 1;
        }

        if (nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }

        const actualizado = await prisma.carritoDetalle.update({
            where: { id: item.id },
            data: {
                cantidad: nuevaCantidad
            }
        });

        return res.json({
            success: true,
            data: actualizado
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};