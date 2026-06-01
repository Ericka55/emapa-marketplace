import {
    crearCategoria,
    listarCategorias,
    actualizarCategoria,
    eliminarCategoria
} from "../services/categoria.service.js";

export const crear = async (req, res) => {

    try {

        const { nombre, descripcion } = req.body;

        const categoria = await crearCategoria(
            nombre,
            descripcion
        );

        return res.status(201).json({
            success: true,
            data: categoria
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const listar = async (req, res) => {

    try {

        const categorias =
            await listarCategorias();

        return res.status(200).json({
            success: true,
            data: categorias
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const actualizar = async (
    req,
    res
) => {

    try {

        const { nombre, descripcion } =
            req.body;

        const categoria =
            await actualizarCategoria(
                req.params.id,
                nombre,
                descripcion
            );

        return res.status(200).json({
            success: true,
            data: categoria
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const eliminar = async (
    req,
    res
) => {

    try {

        await eliminarCategoria(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message:
                "Categoría eliminada correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};