import Router from "express-promise-router";
import {
  createCategoriaCobertura,
  deleteCategoriaCobertura,
  getCategoriaCobertura,
  getCategoriaCoberturas,
  removeCategoriaCobertura,
  updateCategoriaCobertura,
} from "../controllers/categoriaCobertura.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createCategoriaCoberturaSchema } from "../schemas/categoriaCobertura.schema";

const router = Router();

router.get("/ccoberturas", requireAuth, getCategoriaCoberturas);

router.post("/ccoberturas", requireAuth, validateSchema(createCategoriaCoberturaSchema), createCategoriaCobertura);

router.get("/ccoberturas/:id", requireAuth, getCategoriaCobertura);

router.delete("/ccoberturas/:id", requireAuth, removeCategoriaCobertura);

router.delete("/deleteccoberturas/:id", requireAuth, deleteCategoriaCobertura);

router.patch("/ccoberturas/:id", requireAuth, updateCategoriaCobertura);

export default router;