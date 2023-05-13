import { Request, Response } from "express";
import ComprobanteVenta from "../models/ComprobanteVenta";
import User from "../models/User";
import { CreateComprobanteVentaSchema } from "../schemas/comprobanteVenta.schema";
import { isValidObjectId } from "mongoose";

export const getComprobanteVentas = async (req: Request, res: Response) => {
  const ComprobanteVentas = await ComprobanteVenta.find({
  }).populate('author');
  res.json(ComprobanteVentas);
};

export const createComprobanteVenta = async (
  req: Request<unknown, unknown, CreateComprobanteVentaSchema>,
  res: Response
) => {
  const { 
    serie,
    correlativo,
    name 
     } = req.body;

  // find user authorized 
  const userFound = await User.findById(req.user._id);
  if (!userFound) return res.status(400).json({ message: "Token no valido" });

  const afiliadoExist = await ComprobanteVenta.findOne({name:name});
  if (afiliadoExist) return res.status(400).json({ message: "ComprobanteVenta ya existe con el mismo nombre"});

  // create a new ComprobanteVenta
  const newComprobanteVenta = new ComprobanteVenta({
    serie,
    correlativo,
    name,
    author: req.user._id,
  });

  // save ComprobanteVenta
  const ComprobanteVentaSaved = await newComprobanteVenta.save();

  // save user's ComprobanteVenta to the client
  res.json(ComprobanteVentaSaved);
};

export const getComprobanteVenta = async (req: Request, res: Response) => {
  let ComprobanteVentaFound;
  if (isValidObjectId(req.params.id))
    ComprobanteVentaFound = await ComprobanteVenta.findById(req.params.id)
  else
    return res
      .status(400)
      .json({ message: "id no válido. 24ch" });

  if (!ComprobanteVentaFound)
    return res.status(400).json({ message: "ComprobanteVenta no encontrado" });
  res.json(ComprobanteVentaFound);
};

export const deleteComprobanteVenta = async (req: Request, res: Response) => {

  const deletedComprobanteVenta = await ComprobanteVenta.findByIdAndDelete(req.params.id);
  if (!deletedComprobanteVenta)
    return res.status(400).json({ message: "ComprobanteVenta no encontrado" });
  res.json({message:"ComprobanteVenta eliminada totalmente"});
};

export const removeComprobanteVenta = async (req: Request, res: Response) => {

  const updateComprobanteVenta = await ComprobanteVenta.findByIdAndUpdate(req.params.id,{status:0} , {
    new: true,
  });
  if (!updateComprobanteVenta)
    return res.status(400).json({ message: "ComprobanteVenta no encontrada" });
  res.json({message:"ComprobanteVenta removida"});
};

export const updateComprobanteVenta = async (req: Request, res: Response) => {

  const afiliadoUpdate= await ComprobanteVenta.findById(req.params.id)
  if (!afiliadoUpdate)
      return res.status(400).json({ message: "ComprobanteVenta no encontrado" });

  const afiliadoKeyUnique = await ComprobanteVenta.findOne({ name: req.body.name});

  if ( afiliadoKeyUnique && !afiliadoKeyUnique._id.equals(req.params.id))  
      return res.status(400).json({ message: "Nombre ya está en uso" });

  const updateComprobanteVenta = await ComprobanteVenta.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateComprobanteVenta)
    return res.status(400).json({ message: "ComprobanteVenta no encontrado" });
  res.json({message:"update successful"});
};