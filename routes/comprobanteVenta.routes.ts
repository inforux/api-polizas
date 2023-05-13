import Router from "express-promise-router";
import {
  createComprobanteVenta,
  deleteComprobanteVenta,
  getComprobanteVenta,
  getComprobanteVentas,
  removeComprobanteVenta,
  updateComprobanteVenta,
} from "../controllers/comprobanteVenta.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createComprobanteVentaSchema } from "../schemas/comprobanteVenta.schema";

const router = Router();

router.get("/comprobantes", requireAuth, getComprobanteVentas);

router.post("/comprobantes", requireAuth, validateSchema(createComprobanteVentaSchema), createComprobanteVenta);

router.get("/comprobantes/:id", requireAuth, getComprobanteVenta);

router.delete("/comprobantes/:id", requireAuth, removeComprobanteVenta);
router.delete("/deletecomprobantes/:id", requireAuth, deleteComprobanteVenta);

router.patch("/comprobantes/:id", requireAuth, updateComprobanteVenta);

export default router;