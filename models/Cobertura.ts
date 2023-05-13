import {
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Schema } from "mongoose";
import {  ObjectId } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: { enableMergeHooks: true},
})
class Cobertura{

  _id: ObjectId;

  @prop({  type: String, required:true, unique: true })
  name!: string;

  @prop()
  description: string;

  @prop({required:true})
  monto: string;

  @prop({ required: false, type: Schema.Types.ObjectId, ref: 'CategoriaCobertura'} )
  categoria: Schema.Types.ObjectId

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

}

export default getModelForClass(Cobertura);
