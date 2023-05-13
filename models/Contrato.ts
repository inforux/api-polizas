import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({ 
  schemaOptions: { timestamps: true }, 
  options: { enableMergeHooks: true},
})
export class Contrato{

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'ComprobanteVenta'} )
  comprobanteVenta: Schema.Types.ObjectId

  @prop({ required: true, type: String})
  moneda!: string;

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  asesor: Schema.Types.ObjectId

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'Client'} )
  cliente: Schema.Types.ObjectId

  @prop({ required: true, type: Date})
  fechaEmision!: Date;

  @prop({ required: true, type: Date})
  fechaVigenciaInicio!: Date;

  @prop({ required: true, type: Date})
  fechaVigenciaEnd!: Date;

  @prop({ required: true, type: Boolean})
  isContratoCredito!: boolean;

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'Vehiculo'} )
  vehiculo: Schema.Types.ObjectId
   
  @prop({ required: true, type: String})
  tipoDeUso!: string;

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'DetalleContrato'} )
  detallesContrato: Schema.Types.ObjectId[]

  @prop({ required: true, type: String})
  subTotal!: string;

  @prop({ required: true, type: String})
  descuentoTotal!: string;

  @prop({ required: true, type: String})
  impuesto!: string;
  
  @prop({ required: true, type: String})
  total!: string;

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'DetallePago'} )
  detallesPago: Schema.Types.ObjectId[]

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'Tienda'} )
  tienda: Schema.Types.ObjectId

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

}

export default getModelForClass(Contrato);

