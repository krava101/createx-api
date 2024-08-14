import Joi from "joi";

export const projectSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Name is required" }),
  type: Joi.string()
    .required()
    .messages({ "any.required": "Type is required" }),
  status: Joi.string()
    .required()
    .messages({ "any.required": "Status is required" }),
  location: Joi.string()
    .required()
    .messages({ "any.required": "Location is required" }),
  client: Joi.string()
    .required()
    .messages({ "any.required": "Client is required" }),
  architect: Joi.string()
    .required()
    .messages({ "any.required": "Architect is required" }),
  size: Joi.string()
    .required()
    .messages({ "any.required": "Size is required" }),
  value: Joi.string()
    .required()
    .messages({ "any.required": "Value is required" }),
  completed: Joi.string()
    .required()
    .messages({ "any.required": "Completed is required" }),
  description: Joi.string()
    .required()
    .messages({ "any.required": "Description is required" }),
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
