import Router from "express-promise-router";
import {
  createAfiliado,
  deleteAfiliado,
  getAfiliado,
  getAfiliados,
  removeAfiliado,
  updateAfiliado,
} from "../controllers/afiliado.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createAfiliadoSchema } from "../schemas/afiliado.schema";

const router = Router();

router.get("/afiliados", requireAuth, getAfiliados);

router.post("/afiliados", requireAuth, validateSchema(createAfiliadoSchema), createAfiliado);

router.get("/afiliados/:id", requireAuth, getAfiliado);

router.delete("/afiliados/:id", requireAuth, removeAfiliado);

router.delete("/deleteafiliados/:id", requireAuth, deleteAfiliado);

router.patch("/afiliados/:id", requireAuth, updateAfiliado);

export default router;