import { clearTmpFolder } from "../helpers/clearTmp.js";
import { customPathCloudinary } from "../helpers/customPathCloudinary.js";
import uploadImagesFromTmp from "../helpers/uploadImagesFromTmp.js";
import Service from "../models/service.js";
import { idSchema } from "../schemas/schemas.js";
import { serviceSchema, serviceUpdSchema } from "../schemas/serviceSchema.js";

async function getServices(req, res, next) {
  try {
    const services = await Service.find();
    return res.status(200).send(services);
  } catch (e) {
    next(e);
  }
}

async function current(req, res, next) {
  const serviceId = req.params.id;
  const isIdValid = idSchema.validate(serviceId);
  if (isIdValid.error) {
    return res
      .status(400)
      .send({ message: isIdValid.error.details[0].message });
  }
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }
    return res.status(200).send(service);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const service = req.body;
  const files = req.files;
  service.offers = JSON.parse(req.body.offers);
  const isValid = serviceSchema.validate(service);

  if (!files.length) {
    await clearTmpFolder(files);
    return res.status(400).send({ message: "Service image required" });
  }
  if (files.length > 1) {
    await clearTmpFolder(files);
    return res.status(400).send({ message: "Only 1 img allowed for Service" });
  }
  if (isValid.error) {
    await clearTmpFolder(files);
    return res.status(400).send({ message: isValid.error.details[0].message });
  }

  try {
    const images = await uploadImagesFromTmp(files, "services");
    const newImage = images[0];
    const image = { src: customPathCloudinary(newImage) };

    const newService = await Service.create({ ...service, image });
    return res.status(201).send(newService);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  const serviceId = req.params.id;
  const updService = req.body;

  const isIdValid = idSchema.validate(serviceId);
  if (isIdValid.error) {
    return res
      .status(400)
      .send({ message: isIdValid.error.details[0].message });
  }
  const isValid = serviceUpdSchema.validate(updService);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }

  try {
    const service = await Service.findByIdAndUpdate(serviceId, updService, {
      new: true,
    });
    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }
    return res.status(200).send(service);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  const serviceId = req.params.id;
  const isValid = idSchema.validate(serviceId);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }

  try {
    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }
    return res
      .status(200)
      .send({ message: `Service with id: ${serviceId} deleted` });
  } catch (e) {
    next(e);
  }
}

export default { getServices, create, current, update, remove };
