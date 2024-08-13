import Joi from "joi";

export const projectSchema = Joi.object({
  name: Joi.string().required("Name is required"),
  type: Joi.string().required("Type is required"),
  status: Joi.string().required("Status is required"),
  location: Joi.string().required("Location is required"),
  client: Joi.string().required("Client is required"),
  architect: Joi.string().required("Architect is required"),
  size: Joi.string().required("Size is required"),
  value: Joi.string().required("Value is required"),
  completed: Joi.string().required("Completed is required"),
  description: Joi.string().required("Description is required"),
});

export const projectIdSchema = Joi.string().length(24);

export const projectUpdateSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  status: Joi.string(),
  location: Joi.string(),
  client: Joi.string(),
  architect: Joi.string(),
  size: Joi.string(),
  value: Joi.string(),
  completed: Joi.string(),
  description: Joi.string(),
});
