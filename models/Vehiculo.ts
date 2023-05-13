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
class Vehiculo {

  @prop({  type: String, required:true, unique: true })
  placa!: string; 

  @prop({  type: String, required:true})
  marca!: string;

  @prop({required:true})
  modelo: string;

  @prop({required:true})
  anio: string;

  @prop({required:true})
  serieMotor: string;

  @prop({required:true})
  serieCarroceria: string;

  @prop({required:true})
  tipo: number; // 0=sedan, 1=Camion, 2=camioneta

  @prop({required:true})
  asientos: number; 

  @prop({required:true})
  clase: number; // leyenda by FRONT 

  @prop({required:true})
  color: string; //leyenda by FRONT

  @prop({required:true})
  peso: string; //leyenda by FRONT

  @prop({ required: true, type: Schema.Types.ObjectId, ref: 'User'} )
  author: Schema.Types.ObjectId

  @prop({required:true, default:1})
  status!: number; // 0=inactivo , 1=activo

}

export default getModelForClass(Vehiculo);