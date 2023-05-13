import {
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: { enableMergeHooks: true},
})
class Poliza {
  @prop({ required: true, type: String, unique: true })
  codigo: string;

  @prop()
  numPuestos: string;

  @prop()
  tipoVehiculo: string;

  @prop()
  precio: string;

  @prop()
  moneda: string;

  @prop({ required: false, type: Schema.Types.ObjectId, ref: 'DetalleCobertura'} )
  detalleCoberturas: Schema.Types.ObjectId[]

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

}

export default getModelForClass(Poliza);