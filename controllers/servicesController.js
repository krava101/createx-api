import Service from "../models/service.js";
import { serviceSchema } from "../schemas/serviceSchema.js";

async function getServices(req, res, next) {
  try {
    const services = await Service.find();
    return res.status(200).send(services);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const service = req.body;
  const isValid = serviceSchema.validate(service);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  try {
    const newService = await Service.create(service);
    return res.status(201).send(newService);
  } catch (e) {
    next(e);
  }
}

export default { getServices, create };
