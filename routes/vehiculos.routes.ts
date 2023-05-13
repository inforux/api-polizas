import Router from "express-promise-router";
import {
  createVehiculo,
  deleteVehiculo,
  getVehiculo,
  getVehiculos,
  removeVehiculo,
  updateVehiculo,
} from "../controllers/vehiculos.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { createVehiculoSchema } from "../schemas/vehiculo.schema";

const router = Router();

router.get("/vehiculos", requireAuth, getVehiculos);

router.post("/vehiculos", requireAuth, validateSchema(createVehiculoSchema), createVehiculo);

router.get("/vehiculos/:id", requireAuth, getVehiculo);

router.delete("/vehiculos/:id", requireAuth, removeVehiculo);
router.delete("/deletevehiculos/:id", requireAuth, deleteVehiculo);

router.patch("/vehiculos/:id", requireAuth, updateVehiculo);

export default router;