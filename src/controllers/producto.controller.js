import prisma from "../config/prisma.js";
import {
    crearProducto,
    listarProductos,
    obtenerProductoPorId,
    buscarProductos
} from "../services/producto.service.js";

export const crear = async (req, res) => {

    try {

        const vendedor = await prisma.vendedor.findUnique({
            where: {
                usuarioId: req.user.id
            }
        });

        if (!vendedor) {
            return res.status(404).json({
                success: false,
                message: "Vendedor no encontrado"
            });
        }

        const producto = await crearProducto(
            vendedor.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            data: producto
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
export const listar = async (
    req,
    res
) => {

    try {

        const productos =
            await listarProductos();

        return res.status(200).json({
            success: true,
            data: productos
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerPorId = async (
    req,
    res
) => {

    try {

        const producto =
            await obtenerProductoPorId(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: producto
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const buscarPorCategoria = async (
    req,
    res
) => {

    try {

        const productos =
            await buscarProductos(
                req.params.categoriaId
            );

        return res.status(200).json({
            success: true,
            data: productos
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};