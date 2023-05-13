import { z } from "zod";

export const createBancoSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Nombre del banco es requerido",
    }),
  }),
});

export type CreateBancoSchema = z.infer<typeof createBancoSchema>["body"];