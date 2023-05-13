import { Request, Response } from "express";
import Banco from "../models/Banco";
import User from "../models/User";
import { CreateBancoSchema } from "../schemas/banco.schema";
import { isValidObjectId } from "mongoose";

export const getBancos = async (req: Request, res: Response) => {
  const Bancos = await Banco.find({
  }).populate('author');
  res.json(Bancos);
};

export const createBanco = async (
  req: Request<unknown, unknown, CreateBancoSchema>,
  res: Response
) => {
  const { 
    name 
     } = req.body;

  // find user authorized 
  const userFound = await User.findById(req.user._id);
  if (!userFound) return res.status(400).json({ message: "Token no valido" });

  const afiliadoExist = await Banco.findOne({name:name});
  if (afiliadoExist) return res.status(400).json({ message: "Banco ya existe con el mismo documento "});

  // create a new Banco
  const newBanco = new Banco({
    name,
    author: req.user._id,
  });

  // save Banco
  const BancoSaved = await newBanco.save();

  // save user's Banco to the client
  res.json(BancoSaved);
};

export const getBanco = async (req: Request, res: Response) => {
  let BancoFound;
  if (isValidObjectId(req.params.id))
    BancoFound = await Banco.findById(req.params.id)
  else
    return res
      .status(400)
      .json({ message: "id no válido. 24ch" });

  if (!BancoFound)
    return res.status(400).json({ message: "Banco no encontrado" });
  res.json(BancoFound);
};

export const deleteBanco = async (req: Request, res: Response) => {

  const deletedBanco = await Banco.findByIdAndDelete(req.params.id);
  if (!deletedBanco)
    return res.status(400).json({ message: "Banco no encontrado" });
  res.json({message:"Banco eliminada totalmente"});
};

export const removeBanco = async (req: Request, res: Response) => {

  const updateBanco = await Banco.findByIdAndUpdate(req.params.id,{status:0} , {
    new: true,
  });
  if (!updateBanco)
    return res.status(400).json({ message: "Banco no encontrada" });
  res.json({message:"Banco removida"});
};

export const updateBanco = async (req: Request, res: Response) => {

  const afiliadoUpdate= await Banco.findById(req.params.id)
  if (!afiliadoUpdate)
      return res.status(400).json({ message: "Banco no encontrado" });

  const afiliadoKeyUnique = await Banco.findOne({ name: req.body.name});

  if ( afiliadoKeyUnique && !afiliadoKeyUnique._id.equals(req.params.id))  
      return res.status(400).json({ message: "Nombre ya está en uso" });

  const updateBanco = await Banco.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateBanco)
    return res.status(400).json({ message: "Banco no encontrado" });
  res.json({message:"update successful"});
};