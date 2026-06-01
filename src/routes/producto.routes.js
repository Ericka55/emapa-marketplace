import { Router } from "express";

import {
    crear,
    listar,
    obtenerPorId,
    buscarPorCategoria
} from "../controllers/producto.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
    "/",
    verifyToken,
    authorizeRoles("VENDEDOR"),
    crear
);
router.get(
    "/",
    listar
);

router.get(
    "/detalle/:id",
    obtenerPorId
);

router.get(
    "/categoria/:categoriaId",
    buscarPorCategoria
);
export default router;