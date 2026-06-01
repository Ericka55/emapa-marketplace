import { Router } from "express";
import { listar } from "../controllers/pedidoVendedor.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, listar);

export default router;