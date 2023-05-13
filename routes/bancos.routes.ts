import Router from "express-promise-router";
import {
  createBanco,
  deleteBanco,
  getBanco,
  getBancos,
  removeBanco,
  updateBanco,
} from "../controllers/banco.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createBancoSchema } from "../schemas/banco.schema";

const router = Router();

router.get("/bancos", requireAuth, getBancos);

router.post("/bancos", requireAuth, validateSchema(createBancoSchema), createBanco);

router.get("/bancos/:id", requireAuth, getBanco);

router.delete("/bancos/:id", requireAuth, removeBanco);
router.delete("/deletebancos/:id", requireAuth, deleteBanco);

router.patch("/bancos/:id", requireAuth, updateBanco);

export default router;