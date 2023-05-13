import { z } from "zod";

export const createPolizaSchema = z.object({
  body: z.object({
    codigo: z.string({
      required_error: "Código es requerido",
    }),
    numPuestos: z.string({
      required_error: "Número de puesto es requerido",
    }),
    tipoVehiculo: z.string({
      required_error: "Tipo de vehiculo es requerido",
    }),
    precio: z.string({
      required_error: "Precio es requerido",
    }),
    moneda: z.string({
      required_error: "Moneda es requerida",
    }),
    detalleCoberturas: z
      .array(
        z.object({
          cobertura: z.string(),
          precio: z.string(),
        })
      )
      .nonempty({ message: "No puede estar vacío" }),
  }),
});


export type CreatePolizaSchema = z.infer<typeof createPolizaSchema>["body"];
