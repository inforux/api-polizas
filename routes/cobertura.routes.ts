import Router from "express-promise-router";
import {
  createCobertura,
  deleteCobertura,
  getCobertura,
  getCoberturas,
  removeCobertura,
  updateCobertura,
} from "../controllers/cobertura.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createCoberturaSchema } from "../schemas/cobertura.schema";

const router = Router();

router.get("/coberturas", requireAuth, getCoberturas);

router.post("/coberturas", requireAuth, validateSchema(createCoberturaSchema), createCobertura);

router.get("/coberturas/:id", requireAuth, getCobertura);

router.delete("/coberturas/:id", requireAuth, removeCobertura);

router.delete("/deletecoberturas/:id", requireAuth, deleteCobertura);

router.patch("/coberturas/:id", requireAuth, updateCobertura);

export default router;
