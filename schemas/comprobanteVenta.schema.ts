import { z } from "zod";

export const createComprobanteVentaSchema = z.object({
  body: z.object({
    serie: z.string({
      required_error: "Serie es requerido",
    }),
    correlativo: z.string({
      required_error: "Correlativo es requerido",
    }),
    name: z.string({
      required_error: "Nombre es requerido",
    }),
  }),
});

export type CreateComprobanteVentaSchema = z.infer<typeof createComprobanteVentaSchema>["body"];