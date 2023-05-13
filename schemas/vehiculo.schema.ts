import { z } from "zod";

export const createVehiculoSchema = z.object({
  body: z.object({
    placa: z.string({
      required_error: "Placa es requerida",
    }),
    marca: z.string({
      required_error: "documento es requerido",
    }),
    modelo: z.string({
      required_error: "nombres y/o razon social es requerido",
    }),
    anio: z.string({
      required_error: "Dirección es requerida",
    }),
    serieMotor: z.string({
      required_error: "Correo electrónico es requerido",
    }),
    serieCarroceria: z.string({
      required_error: "Serie carroceria es requerido",
    }),
    tipo: z.string({
      required_error: "Tipo de vehiculo es requerido",
    }),
    asientos: z.string({
      required_error: "Aseintos es requerido",
    }),
    clase: z.string({
      required_error: "Clase de vehiculo es requerido",
    }),
    color: z.string({
      required_error: "color del vehiculo es requerido",
    }),
    peso: z.string({
      required_error: "Peso del vehiculo es requerido",
    }),
  }),
});

export type CreateVehiculoSchema = z.infer<typeof createVehiculoSchema>["body"];
