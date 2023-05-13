import { Request, Response } from "express";
import Contrato from "../models/Contrato";
import User from "../models/User";
import { CreateContratoSchema } from "../schemas/contrato.schema";
import {  isValidObjectId } from "mongoose";
import DetalleContrato from "../models/DetalleContrato";
import DetallePago from "../models/DetallePago";
import Poliza from "../models/Poliza";
import Banco from "../models/Banco";
import FormaPago from "../models/FormaPago";
import Tienda from "../models/Tienda";
import ComprobanteVenta from "../models/ComprobanteVenta";

export const getContratos = async (req: Request, res: Response) => {
  const Contratos = await Contrato.find({}).populate("author tienda comprobanteVenta asesor cliente");
  res.json(Contratos);
};

export const createContrato = async (
  req: Request<unknown, unknown, CreateContratoSchema>,
  res: Response
) => {
  try {
    const {
      comprobanteVenta,
      moneda,
      asesor,
      cliente,
      fechaEmision,
      fechaVigenciaInicio,
      fechaVigenciaFin,
      isContratoCredito,
      vehiculo,
      tipoDeUso,
      detallesContrato,
      subTotal,
      descuentoTotal,
      impuesto,
      total,
      detallesPago,
      tienda,
    } = req.body;

    // find user authorized
    const userFound = await User.findById(req.user._id);
    if (!userFound)
      return res.status(400).json({ message: "Token no valido" });

    const storeFound = await Tienda.findById(tienda);
    if (!storeFound)
      return res.status(400).json({ message: "Tienda no encontrada" });

    const cvFound = await ComprobanteVenta.findById(comprobanteVenta);
    if (!cvFound)
      return res.status(400).json({ message: "Comprobante de venta no encontrado" });

    const listValid1 = detallesContrato.map(async (input_detalle) => {
      const poliza = await Poliza.findById(input_detalle.poliza);
      if (!poliza)
        return res
          .status(400)
          .json({ message: "Poliza no encontrada en detalles del contrato" });

      const i_obj = await new DetalleContrato({
        poliza: poliza._id,
        codigoPoliza: poliza.codigo,
        descripcion: input_detalle.descripcion,
        unidadMedida: input_detalle.unidadMedida,
        impuesto: input_detalle.impuesto,
        descuento: input_detalle.unidadMedida,
        cantidad: input_detalle.cantidad,
        precio: input_detalle.precio,
        importe: input_detalle.importe,
        author: req.user._id,
      }).save();
      return i_obj._id;
    });

    const listValid2 = detallesPago.map(async (input_detalle) => {
      const banco = await Banco.findById(input_detalle.banco);
      const objForma = await FormaPago.findById(input_detalle.formaPago);
      if (!banco)
        return res
          .status(400)
          .json({ message: "Banco no encontrado en detalles de pago" });

      if (!objForma)
        return res
          .status(400)
          .json(
            { message: "Forma de pago no encontrada en detalles de pago" },
          );

      const i_obj = await new DetallePago({
        banco: banco._id,
        nameBanco: banco.name,
        formaPago: objForma._id,
        nameFormaPago: objForma.name,
        monto: input_detalle.monto,
        fechaPago: input_detalle.fechaPago,
        author: req.user._id,
      }).save();
      return i_obj._id;
    });

    const revalid1 = await Promise.all(listValid1);
    const revalid2 = await Promise.all(listValid2);

    const newContrato = new Contrato({
      comprobanteVenta,
      moneda,
      asesor,
      cliente,
      fechaEmision: new Date(fechaEmision),
      fechaVigenciaInicio: new Date(fechaVigenciaInicio),
      fechaVigenciaEnd: new Date(fechaVigenciaFin),
      isContratoCredito,
      detallesContrato: revalid1,
      detallesPago: revalid2,
      vehiculo,
      tipoDeUso,
      subTotal,
      descuentoTotal,
      impuesto,
      total,
      tienda,
      author: req.user._id,
    });

    await newContrato.save();
    res.json(newContrato);
  } catch (error) {
    console.log(error);
  }
};

export const getContrato = async (req: Request, res: Response) => {
  let ContratoFound;
  if (isValidObjectId(req.params.id))
    ContratoFound = await Contrato.findById(req.params.id).populate(
      "detallesContrato detallesPago vehiculo author tienda comprobanteVenta asesor cliente"
    );
  else return res.status(400).json({ message: "id no válido. 24ch" });

  if (!ContratoFound)
    return res.status(400).json({ message: "Contrato no encontrado" });
  res.json(ContratoFound);
};

export const deleteContrato = async (req: Request, res: Response) => {
  const deletedContrato = await Contrato.findByIdAndDelete(req.params.id);
  if (!deletedContrato)
    return res.status(400).json({ message: "Contrato no encontrado" });
  res.json({ message: "Contrato eliminada totalmente" });
};

export const removeContrato = async (req: Request, res: Response) => {
  const updateContrato = await Contrato.findByIdAndUpdate(
    req.params.id,
    { status: 0 },
    {
      new: true,
    }
  );
  if (!updateContrato)
    return res.status(400).json({ message: "Contrato no encontrada" });
  res.json({ message: "Contrato removida" });
};

export const updateContrato = async (req: Request, res: Response) => {
  const afiliadoUpdate = await Contrato.findById(req.params.id);
  if (!afiliadoUpdate)
    return res.status(400).json({ message: "Contrato no encontrado" });

  const updateContrato = await Contrato.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!updateContrato)
    return res.status(400).json({ message: "Contrato no encontrado" });
  res.json({ message: "update successful" });
};
