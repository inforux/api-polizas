import { z } from "zod";

export const createTiendaSchema = z.object({
  body: z.object({
    codigo: z.string({
      required_error: "Codigo de tienda es requerido",
    }),
    name: z.string({
      required_error: "Nombre de la tienda es requerido",
    }),
    address: z.string({
      required_error: "Dirección de la tienda es requerido",
    }),
    telefono: z.string({
      required_error: "Telefono es requerido",
    }),
    email: z.string({
      required_error: "Email es requerido",
    }),
    responsable: z.string({
      required_error: "responsable es requerido",
    }),
    gerente: z.string({
      required_error: "Gerente es requerido",
    }),
  }),
});

export type CreateTiendaSchema = z.infer<typeof createTiendaSchema>["body"];