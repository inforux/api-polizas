import { Request, Response } from "express";
import Poliza from "../models/Poliza";
import User from "../models/User";
import { CreatePolizaSchema } from "../schemas/poliza.schema";
import { ObjectId, isValidObjectId } from "mongoose";
import Cobertura from "../models/Cobertura";
import DetalleCobertura from "../models/DetalleCobertura";

export const getPolizas = async (req: Request, res: Response) => {
  const Polizas = await Poliza.find({}).populate(
    "detalleCoberturas.cobertura author"
  );
  res.json(Polizas);
};

export const createPoliza = async (
  req: Request<unknown, unknown, CreatePolizaSchema>,
  res: Response
) => {
  try {
    const {
      codigo,
      numPuestos,
      tipoVehiculo,
      precio,
      moneda,
      detalleCoberturas,
    } = req.body;

    // find Poliza's author
    const userFound = await User.findById(req.user._id);
    if (!userFound)
      return res
        .status(400)
        .json({ message: "Usuario logueado, no encontrado" });

    const polizaExist = await Poliza.findOne({ codigo: codigo });
    if (polizaExist)
      return res
        .status(400)
        .json(
          { message: "Poliza ya existe, con el mismo código.." + codigo },
        );

    // create a new Poliza
    const newPoliza = new Poliza({
      codigo,
      numPuestos,
      tipoVehiculo,
      precio,
      moneda,
      author: req.user._id,
    });

    const PolizaSaved = await newPoliza.save();

    for (const i_detalle of detalleCoberturas) {
      let obj_cobertura = null;
      if (isValidObjectId(i_detalle.cobertura))
        obj_cobertura = await Cobertura.findById(
          i_detalle.cobertura.toString()
        );

      //const castId = new mongoose.Types.ObjectId( i_detalle.cobertura)
      if (!obj_cobertura)
        return res
          .status(400)
          .json(
            { message: "Cobertura no encontrada - " + i_detalle.cobertura },
          );
      const newDetalleCobertura = await new DetalleCobertura({
        precio: i_detalle.precio,
        nombre: obj_cobertura.name,
        poliza: PolizaSaved._id,
        cobertura: obj_cobertura._id,
      }).save();
      PolizaSaved.detalleCoberturas.push(newDetalleCobertura._id);
    }

    await PolizaSaved.save();
    res.json(PolizaSaved);
  } catch (error) {
    console.log(error);
  }
};

export const getPoliza = async (req: Request, res: Response) => {
  let PolizaFound;
  if (isValidObjectId(req.params.id))
    PolizaFound = await Poliza.findById(req.params.id).populate(
      "detalleCoberturas author"
    );
  else return res.status(400).json({ message: "id no válido. 24ch" });

  if (!PolizaFound)
    return res.status(400).json({ message: "Poliza no encontrada" });

  res.json(PolizaFound);
};

export const deletePoliza = async (req: Request, res: Response) => {
  const deletedPoliza = await Poliza.findByIdAndDelete(req.params.id);
  if (!deletedPoliza)
    return res.status(400).json({ message: "Poliza no encontrada" });
  res.json({ message: "Poliza eliminada totalmente" });
};

export const removePoliza = async (req: Request, res: Response) => {
  const removePoliza = await Poliza.findByIdAndUpdate(
    req.params.id,
    { status: 0 },
    {
      new: true,
    }
  );
  if (!removePoliza)
    return res.status(400).json({ message: "Poliza no encontrada" });
  res.json({ message: "Poliza removida" });
};

export const updatePoliza = async (req: Request, res: Response) => {
  const objUpdate = await Poliza.findById(req.params.id);

  const { detalleCoberturas } = req.body;
  if (!objUpdate)
    return res.status(400).json({ message: "Poliza no encontrada" });

  const objKeyUnique = await Poliza.findOne({ codigo: req.body.codigo });

  if (objKeyUnique && objKeyUnique._id.toString() !== req.params.id)
    return res.status(400).json({ message: "Codigo ya está en uso" });

  if (!detalleCoberturas || !(detalleCoberturas.length > 0))
    return res
      .status(400)
      .json({ message: "Lista de coberturas es obligatorio" });

  const updatePoliza = await Poliza.findByIdAndUpdate(
    req.params.id,
    {
      codigo: req.body.codigo,
      numPuestos: req.body.numPuestos,
      tipoVehiculo: req.body.tipoVehiculo,
      precio: req.body.precio,
      moneda: req.body.moneda,
    },
    {
      new: true,
    }
  );

  if (updatePoliza) {
    const listDetallesCobertura :ObjectId[]=[]
    for (const i_detalle of detalleCoberturas) {
      let obj_cobertura = null;
      if (isValidObjectId(i_detalle.cobertura))
        obj_cobertura = await Cobertura.findById(
          i_detalle.cobertura.toString()
        );

      if (!obj_cobertura)
        return res.status(400).json({ message: "Cobertura no encontrada" });

      const foundDetalle = await DetalleCobertura.findOneAndUpdate(
        {
          $and: [{ poliza: objUpdate._id }, { cobertura: obj_cobertura }],
        },
        {
          precio: i_detalle.precio,
          nombre: obj_cobertura.name,
        },
        { new: true }
      );
      if (foundDetalle) {
        listDetallesCobertura.push(foundDetalle._id)
      } else {
        const newDetalleCobertura = await new DetalleCobertura({
          precio: i_detalle.precio,
          nombre: obj_cobertura.name,
          poliza: updatePoliza._id,
          cobertura: obj_cobertura._id,
        }).save();
        listDetallesCobertura.push(newDetalleCobertura._id)
      }
    }
    updatePoliza.detalleCoberturas = listDetallesCobertura
    updatePoliza.save();

    res.json({ message: "update successful" });
  } else {
    return res.status(400).json({ message: "Poliza no encontrada" });
  }
};
