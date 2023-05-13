import { z } from "zod";

export const createClientSchema = z.object({
  body: z.object({
    typeDoc: z.string({
      required_error: "Tipo documento es requerido",
    }),
    doc: z.string({
      required_error: "documento es requerido",
    }),
    names: z.string({
      required_error: "nombres y/o razon social es requerido",
    }),
    address: z.string({
      required_error: "Dirección es requerida",
    }),
    email: z.string({
      required_error: "Correo electrónico es requerido",
    }),
    phone: z.string({
      required_error: "Telefono es requerido",
    }),
    natural: z.string({
      required_error: "Ciudad de procedencia es requerido",
    }),
    dateBorn: z.string({
      required_error: "Fecha de nacimiento is required",
    }),
    sex: z.string({
      required_error: "Sexo es requerido",
    }),
    stateCivil: z.string({
      required_error: "Estado civil es requerido",
    }),
    ubication: z.string({
      required_error: "Ubicación es requerida",
    }),
    ref: z.string({
      required_error: "Referencia es requerida",
    }),
  }),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>["body"];