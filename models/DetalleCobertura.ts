import {  ObjectId } from 'mongoose';

import {
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class DetalleCobertura {

  _id: ObjectId;

  @prop({  type: String, required:true})
  precio!: string;

  @prop({  type: String, required:true})
  nombre!: string;

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'Poliza'} )
  poliza: Schema.Types.ObjectId

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'Cobertura', autopopulate: true} )
  cobertura: Schema.Types.ObjectId

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

}

export default getModelForClass(DetalleCobertura);
