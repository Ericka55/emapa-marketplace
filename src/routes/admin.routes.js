import { Router } from "express";
import prisma from "../config/prisma.js";
import {
    dashboard,
    listarSolicitudes,
    aprobar,
    rechazar,
    incidenciasDashboard, listarIncidenciasAdmin
} from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
    "/dashboard",
    verifyToken,
    authorizeRoles("ADMIN"),
    dashboard
);
router.get(
    "/solicitudes",
    verifyToken,
    authorizeRoles("ADMIN"),
    listarSolicitudes
);
router.put(
    "/solicitudes/:id/aprobar",
    verifyToken,
    authorizeRoles("ADMIN"),
    aprobar
);
router.put(
    "/solicitudes/:id/rechazar",
    verifyToken,
    authorizeRoles("ADMIN"),
    rechazar
);
router.get(
    "/incidencias",
    verifyToken,
    authorizeRoles("ADMIN"),
    incidenciasDashboard
);
router.get(
    "/incidencias/lista",
    verifyToken,
    authorizeRoles("ADMIN"),
    listarIncidenciasAdmin
);
router.get("/usuarios", verifyToken, authorizeRoles("ADMIN"), async (req, res) => {
    const usuarios = await prisma.usuario.findMany();

    res.json({
        success: true,
        data: usuarios
    });
});
router.get("/vendedores", verifyToken, authorizeRoles("ADMIN"), async (req, res) => {
    const vendedores = await prisma.vendedor.findMany({
        include: { usuario: true }
    });

    res.json({
        success: true,
        data: vendedores
    });
});
router.get("/productos", verifyToken, authorizeRoles("ADMIN"), async (req, res) => {
    const productos = await prisma.producto.findMany({
        include: { vendedor: true }
    });

    res.json({
        success: true,
        data: productos
    });
});
export default router;