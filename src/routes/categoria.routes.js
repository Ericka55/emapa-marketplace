import { Router } from "express";

import {
    crear,
    listar,
    actualizar,
    eliminar
} from "../controllers/categoria.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

/*
    ADMIN
*/

router.post(
    "/",
    verifyToken,
    authorizeRoles("ADMIN"),
    crear
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("ADMIN"),
    actualizar
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("ADMIN"),
    eliminar
);

/*
    PÚBLICO
*/

router.get(
    "/",
    listar
);

export default router;