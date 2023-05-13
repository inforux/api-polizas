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
class Afiliado{

  @prop({  type: Number, required:true})
  typeDoc!: number; //0= DNI - 1 = PASAPORTE

  @prop({  type: String, required:true, unique: true })
  doc!: string;

  @prop({required:true})
  names: string;

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

}

export default getModelForClass(Afiliado);