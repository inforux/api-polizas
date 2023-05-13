import { Request, Response } from "express";
import Vehiculo from "../models/Vehiculo";
import User from "../models/User";
import { CreateVehiculoSchema } from "../schemas/vehiculo.schema";
import { isValidObjectId } from "mongoose";

export const getVehiculos = async (req: Request, res: Response) => {
  const Vehiculos = await Vehiculo.find().populate('author');
  res.json(Vehiculos);
};

export const createVehiculo = async (
  req: Request<unknown, unknown, CreateVehiculoSchema>,
  res: Response
) => {
  const { 
     placa,
     marca,
     modelo, 
     anio,
     serieMotor,
     serieCarroceria,
     tipo,
     asientos,
     clase,
     color,
     peso,
     } = req.body;

  // find user authorized 
  const userFound = await User.findById(req.user._id);
  if (!userFound) return res.status(400).json({ message: "Token no valido" });

  const vehiculoExist = await Vehiculo.findOne({placa :placa});
  if (vehiculoExist) return res.status(400).json({ message: "Vehiculo ya existe con la misma placa de rodaje" });

  // create a new Vehiculo
  const newVehiculo = new Vehiculo({
    placa,
    marca,
    modelo, 
    anio,
    serieMotor,
    serieCarroceria,
    tipo,
    asientos,
    clase,
    color,
    peso,
    author: req.user._id,
  });

  const VehiculoSaved = await newVehiculo.save();
  res.json(VehiculoSaved);
};

export const getVehiculo = async (req: Request, res: Response) => {
  let VehiculoFound;
  if (isValidObjectId(req.params.id))
    VehiculoFound = await Vehiculo.findById(req.params.id).populate("author");
  else
    return res
      .status(400)
      .json({ message: "id no válido. 24ch" });

  if (!VehiculoFound)
    return res.status(400).json({ message: "Vehiculo no encontrado" });
  res.json(VehiculoFound);
};

export const deleteVehiculo = async (req: Request, res: Response) => {
  const deletedVehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
  if (!deletedVehiculo)
    return res.status(400).json({ message: "Vehiculo no encontrado" });
  res.json({message:"Vehiculo eliminado totalmente"});
};

export const removeVehiculo = async (req: Request, res: Response) => {
  const updateVehiculo = await Vehiculo.findByIdAndUpdate(req.params.id,{status:0} , {
    new: true,
  });
  if (!updateVehiculo)
    return res.status(400).json({ message: "Vehiculo no encontrado" });
  res.json({message:"Vehiculo removido"});
};

export const updateVehiculo = async (req: Request, res: Response) => {

  const objUpdate= await Vehiculo.findById(req.params.id)
  if (!objUpdate)
      return res.status(400).json({ message: "Vehiculo no encontrado" });

  const objKeyUnique = await Vehiculo.findOne({ placa: req.body.placa});

  if ( objKeyUnique && objKeyUnique._id.toString() !== req.params.id )  
      return res.status(400).json({ message: "Placa de rodaje ya está en uso" });

  const updateVehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateVehiculo)
    return res.status(400).json({ message: "Vehiculo no encontrado" });
  res.json({message:"update successful"});
};