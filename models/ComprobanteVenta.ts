import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({ 
  schemaOptions: { timestamps: true }, 
  options: { enableMergeHooks: true},
})
export class ComprobanteVenta{

  @prop({ required: true, type: String})
  serie!: string;

  @prop({ required: true, type: String})
  correlativo!: string;
  
  @prop({ required: true, type: String, unique: true })
  name!: string;

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

}

export default getModelForClass(ComprobanteVenta);

