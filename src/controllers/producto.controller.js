import prisma from "../config/prisma.js";
import {
    crearProducto,
    listarProductos,
    obtenerProductoPorId,
    buscarProductos
} from "../services/producto.service.js";

export const crear = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

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

        // 🔥 FIX: validar datos
        const {
            nombre,
            descripcion,
            precio,
            stock,
            categoriaId
        } = req.body;

        if (!nombre || !precio || !stock || !categoriaId) {
            return res.status(400).json({
                success: false,
                message: "Faltan datos del producto"
            });
        }

        const producto = await prisma.producto.create({
            data: {
                vendedorId: vendedor.id,
                categoriaId: Number(categoriaId),
                nombre,
                descripcion,
                precio: Number(precio),
                stock: Number(stock)
            }
        });

        // 🖼️ IMAGEN
        if (req.file) {
            await prisma.imagenProducto.create({
                data: {
                    productoId: producto.id,
                    urlImagen: `/uploads/${req.file.filename}`,
                    principal: true
                }
            });
        }

        const productoCompleto = await prisma.producto.findUnique({
            where: { id: producto.id },
            include: { imagenes: true }
        });

        return res.status(201).json({
            success: true,
            data: productoCompleto
        });

    } catch (error) {
        console.log("🔥 ERROR CREANDO PRODUCTO:", error);

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