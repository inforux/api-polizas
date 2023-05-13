import { z } from "zod";

export const createAfiliadoSchema = z.object({
  body: z.object({
    typeDoc: z.string({
      required_error: "Tipo de documento es requerido",
    }),
    doc: z.string({
      required_error: "Documento es requerida",
    }),
    names: z.string({
      required_error: "Nombres es requerida",
    }),
  }),
});

export type CreateAfiliadoSchema = z.infer<typeof createAfiliadoSchema>["body"];