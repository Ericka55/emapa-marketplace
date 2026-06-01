import prisma from "../config/prisma.js";

export const crearCategoria = async (
    nombre,
    descripcion
) => {

    return await prisma.categoria.create({
        data: {
            nombre,
            descripcion
        }
    });

};

export const listarCategorias = async () => {

    return await prisma.categoria.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

};

export const actualizarCategoria = async (
    id,
    nombre,
    descripcion
) => {

    return await prisma.categoria.update({
        where: {
            id: Number(id)
        },
        data: {
            nombre,
            descripcion
        }
    });

};

export const eliminarCategoria = async (
    id
) => {

    return await prisma.categoria.delete({
        where: {
            id: Number(id)
        }
    });

};