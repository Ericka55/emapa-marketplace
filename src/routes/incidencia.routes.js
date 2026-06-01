import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
    crearIncidencia,
    listarIncidenciasUsuario,
    misIncidencias,
    incidenciasVendedor,
    todasIncidencias
} from "../controllers/incidencia.controller.js";

const router = Router();

/* =========================
   COMPRADOR
========================= */
router.post(
    "/",
    verifyToken,
    authorizeRoles("COMPRADOR"),
    crearIncidencia
);

router.get(
    "/mis",
    verifyToken,
    authorizeRoles("COMPRADOR"),
    misIncidencias
);

/* =========================
   VENDEDOR
========================= */
router.get(
    "/vendedor",
    verifyToken,
    authorizeRoles("VENDEDOR"),
    incidenciasVendedor
);

/* =========================
   ADMIN
========================= */
router.get(
    "/admin",
    verifyToken,
    authorizeRoles("ADMIN"),
    todasIncidencias
);

/* =========================
   GENERAL (usuario logueado)
========================= */
router.get(
    "/",
    verifyToken,
    listarIncidenciasUsuario
);

export default router;