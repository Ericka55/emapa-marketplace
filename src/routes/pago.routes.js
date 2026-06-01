import { Router } from "express";
import {
    crear,
    obtener,
    pagar
} from "../controllers/pago.controller.js";

const router = Router();

router.post("/", crear);
router.get("/:pedidoId", obtener);
router.put("/:id/pagar", pagar);

export default router;