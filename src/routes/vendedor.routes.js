import { Router } from "express";

import {
solicitarVendedor,
dashboard,
misProductos,
crearProducto,
actualizarStock,
actualizarProducto,
eliminarProducto,
misVentas,
dashboardVendedorIncidencias, completarPerfilVendedor, obtenerMiPerfil
} from "../controllers/vendedor.controller.js";


import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();
router.get(
    "/me",
    verifyToken,
    authorizeRoles("VENDEDOR"),
    obtenerMiPerfil
);
router.post(
"/solicitud",
verifyToken,
authorizeRoles("COMPRADOR"),
solicitarVendedor
);
router.put(
    "/perfil",
    verifyToken,
    authorizeRoles("VENDEDOR"),
    completarPerfilVendedor
);

router.get(
"/dashboard",
verifyToken,
authorizeRoles("VENDEDOR"),
dashboard
);

router.get(
"/productos",
verifyToken,
authorizeRoles("VENDEDOR"),
misProductos
);

router.post(
"/productos",
verifyToken,
authorizeRoles("VENDEDOR"),
crearProducto
);

router.put(
"/stock/:id",
verifyToken,
authorizeRoles("VENDEDOR"),
actualizarStock
);

router.delete(
"/productos/:id",
verifyToken,
authorizeRoles("VENDEDOR"),
eliminarProducto
);

router.get(
"/ventas",
verifyToken,
authorizeRoles("VENDEDOR"),
misVentas
);

router.get(
"/incidencias",
verifyToken,
authorizeRoles("VENDEDOR"),
dashboardVendedorIncidencias
);
router.put(
"/productos/:id",
verifyToken,
authorizeRoles("VENDEDOR"),
actualizarProducto
);


export default router;
