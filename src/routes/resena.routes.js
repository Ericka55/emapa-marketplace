import { Router } from "express";
import {
    crearResena,
    listarResenasProducto
} from "../controllers/resena.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();


router.post(
    "/resenas",
    verifyToken,
    authorizeRoles("COMPRADOR"),
    crearResena
);

router.get(
    "/resenas/:productoId",
    listarResenasProducto
);
export default router;
