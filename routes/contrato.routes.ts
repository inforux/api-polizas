import Router from "express-promise-router";
import {
  createContrato,
  deleteContrato,
  getContrato,
  getContratos,
  removeContrato,
  updateContrato,
} from "../controllers/contrato.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createContratoSchema } from "../schemas/contrato.schema";

const router = Router();

router.get("/contratos", requireAuth, getContratos);

router.post("/contratos", requireAuth, validateSchema(createContratoSchema), createContrato);

router.get("/contratos/:id", requireAuth, getContrato);

router.delete("/contratos/:id", requireAuth, removeContrato);
router.delete("/deletecontratos/:id", requireAuth, deleteContrato);

//router.patch("/contratos/:id", requireAuth, updateContrato);

export default router;