import { Request, Response } from "express";
import Cobertura from "../models/Cobertura";
import User from "../models/User";
import { CreateCoberturaSchema } from "../schemas/cobertura.schema";
import { isValidObjectId } from "mongoose";
import CategoriaCobertura from "../models/CategoriaCobertura";

export const getCoberturas = async (req: Request, res: Response) => {
  const Coberturas = await Cobertura.find({}).populate("author categoria");
  res.json(Coberturas);
};

export const createCobertura = async (
  req: Request<unknown, unknown, CreateCoberturaSchema>,
  res: Response
) => {
  try {
    const { name, description, monto, categoria } = req.body;

    // find user authorized
    const userFound = await User.findById(req.user._id);
    if (!userFound)
      return res
        .status(400)
        .json({ message: "Token no valido" });

    let cc:any;
    if (isValidObjectId(categoria)) 
      cc = await CategoriaCobertura.findOne({ _id: categoria });

    if (!cc)
      return res.status(400).json({ message: "Categoria no encontrada" });
    
    const coberturaExist = await Cobertura.findOne({ name: name });
    if( coberturaExist )
      return res.status(400).json({ message: "Categoria ya existe, con el mismo nombre" });

    // create a new Cobertura
    const newCobertura = new Cobertura({
      name,
      description,
      monto,
      categoria: cc._id,
      author: req.user._id,
    });

    // save Cobertura
    const CoberturaSaved = await newCobertura.save();

    // save user's Cobertura to the client
    res.json(CoberturaSaved);
  } catch (error) {
    console.log(error);
  }
}

export const getCobertura = async (req: Request, res: Response) => {
  let CoberturaFound;
  if (isValidObjectId(req.params.id))
    CoberturaFound = await Cobertura.findById(req.params.id).populate("author categoria")
  else return res.status(400).json({ message: "id no válido. 24ch" });

  if (!CoberturaFound)
    return res.status(400).json({ message: "Cobertura no encontrado" });
  res.json(CoberturaFound);
};

export const deleteCobertura = async (req: Request, res: Response) => {
  const deletedCobertura = await Cobertura.findByIdAndDelete(req.params.id);
  if (!deletedCobertura)
    return res.status(400).json({ message: "Cobertura no encontrado" });
  res.json({ message: "Cobertura eliminada totalmente" });
};

export const removeCobertura = async (req: Request, res: Response) => {
  const updateCobertura = await Cobertura.findByIdAndUpdate(
    req.params.id,
    { status: 0 },
    {
      new: true,
    }
  );
  if (!updateCobertura)
    return res.status(400).json({ message: "Cobertura no encontrada" });
  res.json({ message: "Cobertura removida" });
};

export const updateCobertura = async (req: Request, res: Response) => {

  const objUpdate= await Cobertura.findById(req.params.id)
  if (!objUpdate)
      return res.status(400).json({ message: "Cobertura no encontrada" });

  const objKeyUnique = await Cobertura.findOne({ name: req.body.name });

  if ( objKeyUnique && objKeyUnique._id.toString() !== req.params.id )  
      return res.status(400).json({ message: "Nombre ya está en uso" });

  const updateCobertura = await Cobertura.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!updateCobertura)
    return res.status(400).json({ message: "Cobertura no encontrado" });
  res.json({ message: "update successful" });
};
