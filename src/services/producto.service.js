import prisma from "../config/prisma.js";

export const crearProducto = async (
    vendedorId,
    data
) => {

    const producto = await prisma.producto.create({
        data: {
            vendedorId,
            categoriaId: data.categoriaId,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            stock: data.stock
        }
    });

    if (
        data.imagenes &&
        data.imagenes.length > 0
    ) {

        await prisma.imagenProducto.createMany({
            data: data.imagenes.map(
                (url, index) => ({
                    productoId: producto.id,
                    urlImagen: url,
                    principal: index === 0
                })
            )
        });

    }

    return await prisma.producto.findUnique({
        where: {
            id: producto.id
        },
        include: {
            categoria: true,
            imagenes: true
        }
    });

};
export const listarProductos = async () => {

    return await prisma.producto.findMany({
        include: {
            categoria: true,
            vendedor: {
                include: {
                    usuario: true
                }
            },
            imagenes: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

};

export const obtenerProductoPorId = async (
    id
) => {

    return await prisma.producto.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            categoria: true,
            vendedor: {
                include: {
                    usuario: true
                }
            },
            imagenes: true,
            resenas: true
        }
    });

};

export const buscarProductos = async (
    categoriaId
) => {

    return await prisma.producto.findMany({
        where: {
            categoriaId: Number(categoriaId),
            estado: true
        },
        include: {
            categoria: true,
            imagenes: true
        }
    });

};