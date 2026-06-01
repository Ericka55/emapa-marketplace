import { Router } from "express";
import { crear, misPedidos } from "../controllers/pedido.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", crear);
router.get(
    "/mis-pedidos",
    verifyToken,
    misPedidos
);
export default router;