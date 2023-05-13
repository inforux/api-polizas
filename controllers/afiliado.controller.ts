import { Request, Response } from "express";
import Afiliado from "../models/Afiliado";
import User from "../models/User";
import { CreateAfiliadoSchema } from "../schemas/afiliado.schema";
import { isValidObjectId } from "mongoose";

export const getAfiliados = async (req: Request, res: Response) => {
  const Afiliados = await Afiliado.find({
  }).populate('author');
  res.json(Afiliados);
};

export const createAfiliado = async (
  req: Request<unknown, unknown, CreateAfiliadoSchema>,
  res: Response
) => {
  const { 
    typeDoc,
    doc,
    names, 
     } = req.body;

  // find user authorized 
  const userFound = await User.findById(req.user._id);
  if (!userFound) return res.status(400).json({ message: "Token no valido" });

  const afiliadoExist = await Afiliado.findOne({doc:doc});
  if (afiliadoExist) return res.status(400).json({ message: "Afiliado ya existe con el mismo documento "});

  // create a new Afiliado
  const newAfiliado = new Afiliado({
    typeDoc, 
    doc,
    names,
    author: req.user._id,
  });

  // save Afiliado
  const AfiliadoSaved = await newAfiliado.save();

  // save user's Afiliado to the client
  res.json(AfiliadoSaved);
};

export const getAfiliado = async (req: Request, res: Response) => {
  let AfiliadoFound;
  if (isValidObjectId(req.params.id))
    AfiliadoFound = await Afiliado.findById(req.params.id).populate("author");
  else
    return res
      .status(400)
      .json({ message: "id no válido. 24ch" });

  if (!AfiliadoFound)
    return res.status(400).json({ message: "Afiliado no encontrado" });
  res.json(AfiliadoFound);
};

export const deleteAfiliado = async (req: Request, res: Response) => {

  const deletedAfiliado = await Afiliado.findByIdAndDelete(req.params.id);
  if (!deletedAfiliado)
    return res.status(400).json({ message: "Afiliado no encontrado" });
  res.json({message:"Afiliado eliminada totalmente"});
};

export const removeAfiliado = async (req: Request, res: Response) => {

  const updateAfiliado = await Afiliado.findByIdAndUpdate(req.params.id,{status:0} , {
    new: true,
  });
  if (!updateAfiliado)
    return res.status(400).json({ message: "Afiliado no encontrada" });
  res.json({message:"Afiliado removida"});
};

export const updateAfiliado = async (req: Request, res: Response) => {

  const afiliadoUpdate= await Afiliado.findById(req.params.id)
  if (!afiliadoUpdate)
      return res.status(400).json({ message: "Afiliado no encontrado" });

  const afiliadoKeyUnique = await Afiliado.findOne({ doc: req.body.doc });

  if ( afiliadoKeyUnique && !afiliadoKeyUnique._id.equals(req.params.id))  
      return res.status(400).json({ message: "Documento ya está en uso" });

  const updateAfiliado = await Afiliado.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateAfiliado)
    return res.status(400).json({ message: "Afiliado no encontrado" });
  res.json({message:"update successful"});
};