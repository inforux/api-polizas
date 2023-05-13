import Router from "express-promise-router";
import {
  createPoliza,
  deletePoliza,
  getPoliza,
  getPolizas,
  removePoliza,
  updatePoliza,
} from "../controllers/polizas.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createPolizaSchema } from "../schemas/poliza.schema";

const router = Router();

router.get("/polizas", requireAuth, getPolizas);

router.post("/polizas", requireAuth, validateSchema(createPolizaSchema), createPoliza );

router.get("/polizas/:id", requireAuth, getPoliza);

router.delete("/polizas/:id", requireAuth, removePoliza);
router.delete("/deletepolizas/:id", requireAuth, deletePoliza);

router.patch("/polizas/:id", requireAuth, updatePoliza);

export default router;