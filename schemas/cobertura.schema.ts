import { z } from "zod";

export const createCoberturaSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Nombre es requerido",
    }),
    description: z.string({
      required_error: "Descripcion es requerida",
    }),
    monto: z.string({
      required_error: "Monto es requerido",
    }),
    categoria: z.string({
      required_error: "Categoria es requerida",
    }),
  }),
});

export type CreateCoberturaSchema = z.infer<typeof createCoberturaSchema>["body"];