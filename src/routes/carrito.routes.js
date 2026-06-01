import { Router } from "express";

import {
    agregar,
    verCarrito,
    checkout, actualizarCantidad
} from "../controllers/carrito.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
    "/agregar",
    verifyToken,
    authorizeRoles("COMPRADOR"),
    agregar
);

router.get(
    "/",
    verifyToken,
    authorizeRoles("COMPRADOR"),
    verCarrito
);
router.post(
    "/checkout",
    verifyToken,
    authorizeRoles("COMPRADOR"),
    checkout
);
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("COMPRADOR"),
    actualizarCantidad
);
export default router;