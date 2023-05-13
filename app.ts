import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import polizasRoutes from "./routes/polizas.routes";
import categoriasCoberturaRoutes from "./routes/categoriaCobertura.routes";
import clientsRoutes from "./routes/clients.routes";
import coberturaRoutes from "./routes/cobertura.routes";
import vehiculosRoutes from "./routes/vehiculos.routes";
import afiliadoRoutes from "./routes/afiliado.routes";
import roleRoutes from "./routes/roles.routes";
import sistemaRoutes from "./routes/sistema.routes";
import bancosRoutes from "./routes/bancos.routes";
import tiendaRoutes from "./routes/tienda.routes";
import formasPagoRoutes from "./routes/formaPago.routes";
import contratoRoutes from "./routes/contrato.routes";
import comprobanteVentaRoutes from "./routes/comprobanteVenta.routes";
import {createData } from './boot'

const app = express();
createData()

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/affiliate", afiliadoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cc", categoriasCoberturaRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/coverage", coberturaRoutes);
app.use("/api/polize", polizasRoutes);
app.use("/api/motors", vehiculosRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/system", sistemaRoutes)
app.use("/api/bank", bancosRoutes)
app.use("/api/store", tiendaRoutes)
app.use("/api/fp", formasPagoRoutes)
app.use("/api/contract", contratoRoutes)
app.use("/api/cv", comprobanteVentaRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found");
  next(error);
});

app.use((err:any, req:any, res:any, next:any) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json([
    {
      message,
    },
  ]);
});

export default app;