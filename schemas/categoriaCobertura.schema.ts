import { z } from "zod";

export const createCategoriaCoberturaSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Nombre es requerido",
    }),
    description: z.string({
      required_error: "Descripcion es requerida",
    }),
  }),
});

export type CreateCategoriaCoberturaSchema = z.infer<typeof createCategoriaCoberturaSchema>["body"];
