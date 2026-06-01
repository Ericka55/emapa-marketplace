import { crearSolicitud } from "../services/vendedor.service.js";
import prisma from "../config/prisma.js";
import { getIncidenciasVendedor } from "../services/admin.service.js";

export const dashboard = async (req, res) => {

    try {

        const vendedor = await prisma.vendedor.findUnique({
            where: {
                usuarioId: req.user.id
            }
        });

        const productos =
            await prisma.producto.count({
                where: {
                    vendedorId: vendedor.id
                }
            });

        const pedidos =
            await prisma.pedido.count({
                where: {
                    vendedorId: vendedor.id
                }
            });

        const ventas =
            await prisma.pedido.aggregate({
                _sum: {
                    total: true
                },
                where: {
                    vendedorId: vendedor.id
                }
            });

        const incidencias =
            await prisma.incidencia.count({
                where: {
                    pedido: {
                        vendedorId: vendedor.id
                    }
                }
            });

        res.json({
            success: true,
            data: {
                productos,
                pedidos,
                incidencias,
                ventas: ventas._sum.total || 0
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
export const eliminarProducto = async (req, res) => {

```
try {

    await prisma.producto.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    return res.json({
        success: true,
        message: "Producto eliminado"
    });

} catch (error) {

    return res.status(500).json({
        success: false,
        message: error.message
    });

}
```

};

export const misProductos = async (req, res) => {

    const vendedor =
        await prisma.vendedor.findUnique({
            where: {
                usuarioId: req.user.id
            }
        });

    const productos =
        await prisma.producto.findMany({
            where: {
                vendedorId: vendedor.id
            },
            include: {
                imagenes: true,
                categoria: true
            }
        });

    res.json({
        success: true,
        data: productos
    });

};

export const crearProducto = async (req, res) => {

    const vendedor =
        await prisma.vendedor.findUnique({
            where: {
                usuarioId: req.user.id
            }
        });

    const producto =
        await prisma.producto.create({
            data: {
                vendedorId: vendedor.id,
                categoriaId: Number(req.body.categoriaId),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: Number(req.body.precio),
                stock: Number(req.body.stock)
            }
        });

    if (req.body.imagen) {

        await prisma.imagenProducto.create({
            data: {
                productoId: producto.id,
                urlImagen: req.body.imagen,
                principal: true
            }
        });

    }

    const productoCompleto =
        await prisma.producto.findUnique({
            where: {
                id: producto.id
            },
            include: {
                imagenes: true
            }
        });

    res.json({
        success: true,
        data: productoCompleto
    });
};

export const actualizarStock = async (req, res) => {

    const producto =
        await prisma.producto.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                stock: Number(req.body.stock)
            }
        });

    res.json({
        success: true,
        data: producto
    });

};
export const dashboardVendedorIncidencias = async (req, res) => {

    try {

        const vendedor = await prisma.vendedor.findUnique({
            where: { usuarioId: req.user.id }
        });

        const data = await getIncidenciasVendedor(vendedor.id);

        return res.json({
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const actualizarProducto = async (req, res) => {

try {

    const producto = await prisma.producto.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: Number(req.body.precio),
            stock: Number(req.body.stock),
            categoriaId: Number(req.body.categoriaId)
        }
    });

    return res.json({
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

export const misVentas = async (req, res) => {

try {

    const vendedor = await prisma.vendedor.findUnique({
        where: {
            usuarioId: req.user.id
        }
    });

    const ventas = await prisma.detallePedido.findMany({
        where: {
            producto: {
                vendedorId: vendedor.id
            }
        },
        include: {
            producto: {
                include: {
                    imagenes: true
                }
            },
            pedido: {
                include: {
                    comprador: true,
                    estadoPedido: true,
                    pagos: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    });

    let totalVentas = 0;

    ventas.forEach(v => {
        totalVentas += Number(v.precioUnitario) * v.cantidad;
    });

    return res.json({
        success: true,
        data: {
            totalVentas,
            ventas
        }
    });

} catch (error) {

    return res.status(500).json({
        success: false,
        message: error.message
    });

}

};

export const solicitarVendedor = async (
    req,
    res
) => {

    try {

        const solicitud =
            await crearSolicitud(
                req.user.id,
                req.body.motivo
            );

        return res.status(201).json({
            success: true,
            data: solicitud
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
export const completarPerfilVendedor = async (req, res) => {
    try {

        const userId = req.user.id;

        const { negocio, descripcion, whatsapp, direccion } = req.body;

        const vendedor = await prisma.vendedor.update({
            where: { usuarioId: userId },
            data: {
                negocio,
                descripcion,
                whatsapp,
                direccion
            }
        });

        return res.json({
            success: true,
            data: vendedor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const obtenerMiPerfil = async (req, res) => {
    try {

        const vendedor = await prisma.vendedor.findUnique({
            where: {
                usuarioId: req.user.id
            }
        });

        const perfilCompleto =
            vendedor &&
            vendedor.negocio &&
            vendedor.descripcion &&
            vendedor.whatsapp &&
            vendedor.direccion;

        return res.json({
            success: true,
            data: {
                vendedor,
                perfilCompleto
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};