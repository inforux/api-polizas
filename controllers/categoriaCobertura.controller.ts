import { Request, Response } from "express";
import CategoriaCobertura from "../models/CategoriaCobertura";
import User from "../models/User";
import { CreateCategoriaCoberturaSchema } from "../schemas/categoriaCobertura.schema";
import { isValidObjectId } from "mongoose";

export const getCategoriaCoberturas = async (req: Request, res: Response) => {
  const CategoriaCoberturas = await CategoriaCobertura.find({
  }).populate('author');
  res.json(CategoriaCoberturas);
};

export const createCategoriaCobertura = async (
  req: Request<unknown, unknown, CreateCategoriaCoberturaSchema>,
  res: Response
) => {
  const { 
    name,
    description
     } = req.body;

  // find user authorized 
  const userFound = await User.findById(req.user._id);
  if (!userFound) return res.status(400).json({ message: "Token no valido" });

  const categorriaCobertura = await CategoriaCobertura.findOne({name:name});
  if (categorriaCobertura ) return res.status(400).json({ message: "La categoria ya existe con el mismo nombre"});

  // create a new CategoriaCobertura
  const newCategoriaCobertura = new CategoriaCobertura({
    name,
    description,
    author: req.user._id,
  });

  // save CategoriaCobertura
  const CategoriaCoberturaSaved = await newCategoriaCobertura.save();

  // save user's CategoriaCobertura to the client
  res.json(CategoriaCoberturaSaved);
};

export const getCategoriaCobertura = async (req: Request, res: Response) => {
  let CategoriaCoberturaFound;
  if (isValidObjectId(req.params.id))
    CategoriaCoberturaFound = await CategoriaCobertura.findById(req.params.id).populate("author");
  else
    return res
      .status(400)
      .json({ message: "id no válido. 24ch" });

  if (!CategoriaCoberturaFound)
    return res.status(400).json({ message: "CategoriaCobertura no encontrado" });
  res.json(CategoriaCoberturaFound);
};

export const deleteCategoriaCobertura = async (req: Request, res: Response) => {

  const deletedCategoriaCobertura = await CategoriaCobertura.findByIdAndDelete(req.params.id);
  if (!deletedCategoriaCobertura)
    return res.status(400).json({ message: "Categoria de cobertura no encontrado" });
  res.json({message:"Categoria cobertura eliminada totalmente"});
};

export const removeCategoriaCobertura = async (req: Request, res: Response) => {

  const updateCategoriaCobertura = await CategoriaCobertura.findByIdAndUpdate(req.params.id,{status:0} , {
    new: true,
  });
  if (!updateCategoriaCobertura)
    return res.status(400).json({ message: "CategoriaCobertura no encontrada" });
  res.json({message:"CategoriaCobertura removida"});
};

export const updateCategoriaCobertura = async (req: Request, res: Response) => {

  const objUpdate= await CategoriaCobertura.findById(req.params.id)
  if (!objUpdate)
      return res.status(400).json({ message: "Categoria de cobertura no encontrada" });

  const objKeyUnique = await CategoriaCobertura.findOne({ name: req.body.name });

  if ( objKeyUnique && !objKeyUnique._id.equals(req.params.id))  
      return res.status(400).json({ message: "Nombre ya está en uso" });

  const updateCategoriaCobertura = await CategoriaCobertura.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateCategoriaCobertura)
    return res.status(400).json({ message: "Categoria de cobertura no encontrado" });
  res.json({message:"update successful"});
};
