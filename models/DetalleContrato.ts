import {  ObjectId } from 'mongoose';

import {
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({ 
  schemaOptions: { timestamps: true }, 
  options: { enableMergeHooks: true},
})
export class DetalleContrato{

  _id: ObjectId;

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'Poliza'} )
  poliza: Schema.Types.ObjectId

  @prop({  type: String, required:true})
  codigoPoliza!: string;

  @prop({  type: String, required:true})
  descripcion!: string;

  @prop({  type: String, required:true})
  impuesto!: string;

  @prop({  type: String, required:true})
  descuento!: string;

  @prop({  type: String, required:true})
  unidadMedida!: string;

  @prop({  type: String, required:true})
  cantidad!: string;

  @prop({  type: String, required:true})
  precio!: string;

  @prop({  type: String, required:true})
  importe!: string;

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

  @prop({ type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

}

export default getModelForClass(DetalleContrato);