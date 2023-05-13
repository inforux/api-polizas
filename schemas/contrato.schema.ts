import { z } from "zod";

export const createContratoSchema = z.object({
  body: z.object({
    comprobanteVenta: z.string({
      required_error: "Comprobante de venta es requerido",
    }).nonempty({message:'Comprobante de venta no debe estar vacio'} ),
    moneda: z.string({
      required_error: "Moneda es requerido",
    }).nonempty({message:'Moneda no debe estar vacio'} ),
    asesor: z.string({
      required_error: "asesor es requerido",
    }).nonempty({message:'Asesor no debe estar vacio'} ),
    cliente: z.string({
      required_error: "Cliente es requerido",
    }).nonempty({message:'Cliente no debe estar vacio'} ),
    fechaEmision: z.string({
      required_error: "Fecha de emision es requerido",
    }).nonempty({message:'Fecha de emision no debe estar vacio'} ),
    fechaVigenciaInicio: z.string({
      required_error: "Fecha de vigencia de inicio es requerido",
    }).nonempty({message:'Fecha de vigencia de inicio no debe estar vacio'} ),
    fechaVigenciaFin: z.string({
      required_error: "Fecha de fin de vigencia es requerido",
    }).nonempty({message:'Fecha de fin de vigencia no debe estar vacio'} ),
    isContratoCredito: z.string({
      required_error: "Tipo de Contrato por crédito es requerido",
    }).nonempty({message:'Tipo de contrrado no debe estar vacio'} ),
    vehiculo: z.string({
      required_error: "Vehiculo es requerido",
    }).nonempty({message:'Vehiculo no debe estar vacio'} ),
    tipoDeUso: z.string({
      required_error: "Tipo de uso es requerido",
    }).nonempty({message:'Tipo de uso no debe estar vacio'} ),
    detallesContrato: z
      .array(
        z.object({
          poliza: z.string(),
          descripcion: z.string({
            required_error: "Tipo de uso es requerido",
          }).nonempty({message:'Descripcion no debe estar vacia'} ),
          impuesto: z.string({
            required_error: "Impuesto es requerido",
          }).nonempty({message:'Impuesto no debe estar vacio'} ),
          descuento: z.string({
            required_error: "Descuento es requerido",
          }).nonempty({message:'Descuento no debe estar vacio'} ),
          unidadMedida: z.string({
            required_error: "Unidad de medida es requerido",
          }).nonempty({message:'Unidad de medida no debe estar vacio'} ),
          cantidad: z.string({
          required_error: "Cantidad es requerido",
          }).nonempty({message:'Cantidad no debe estar vacio'} ),
          precio: z.string({
            required_error: "Precio es requerido",
          }).nonempty({message:'Precio no debe estar vacio'} ),
          importe: z.string({
            required_error: "Importe es requerido",
          }).nonempty({message:'Importe no debe estar vacio'} ),
        })
      )
      .nonempty({ message: "Detalles contrado no puede estar vacío" }),
    subTotal: z.string({
      required_error: "Sub total es requerido",
    }).nonempty({message:'Subtotal no debe estar vacio'} ),
    descuentoTotal: z.string({
      required_error: "Descuento total es requerido",
    }).nonempty({message:'Descuento no debe estar vacio'} ),
    impuesto: z.string({
      required_error: "Impuesto es requerido",
    }).nonempty({message:'Impuesto no debe estar vacio'} ),
    total: z.string({
      required_error: "Total es requerido",
    }).nonempty({message:'Total no debe estar vacio'} ),
    tienda: z.string({
      required_error: "Tienda es requerido",
    }).nonempty({message:'Tienda no debe estar vacio'} ),
    detallesPago: z
      .array(
        z.object({
          monto: z.string({
            required_error: "Monto es requerido",
          }).nonempty({message:'Monto no debe estar vacio'} ),
          formaPago: z.string({
            required_error: "Forma de pago es requerido",
          }).nonempty({message:'Forma de pago no debe estar vacio'} ),
          banco: z.string({
            required_error: "Banco es requerido",
          }).nonempty({message:'Banco no debe estar vacio'} ),
          fechaPago: z.string({
            required_error: "Fecha de pago es requerido",
          }).nonempty({message:'Fecha de pagoi no debe estar vacio'} ),
        })
      )
      .nonempty({ message: "Detalles contrado no puede estar vacío" }),
  }),
});

export type CreateContratoSchema = z.infer<typeof createContratoSchema>["body"];
