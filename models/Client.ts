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
class Client {

  @prop({  type: Number, required:true})
  typeDoc!: number; //0= DNI - 1 = PASAPORTE

  @prop({  type: String, required:true, unique: true })
  doc!: string;

  @prop({required:true})
  names: string;

  @prop({required:true})
  address: string;

  @prop({ required: true, type: String, unique: true })
  email!: string;

  @prop({ required: true, type: String })
  phone!: string;

  @prop({required:true})
  natural: string;

  @prop()
  dateBorn: Date;

  @prop()
  sex: number; // 0=VARON, 1=FEMALE, 2=INDETERMINATE

  @prop()
  stateCivil: number; //0=SINGLE, 1=MARRIED, 2=DIVORCIADO
  
  @prop()
  ubication: string; 

  @prop()
  ref: string; 

  @prop()
  password!: string;

  @prop({ required: false, type: Schema.Types.ObjectId, ref: 'Afiliado'} )
  afiliado: Schema.Types.ObjectId

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

}

export default getModelForClass(Client);