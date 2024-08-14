import Joi from "joi";

const offerSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "Offer title is required" }),
  description: Joi.string()
    .required()
    .messages({ "any.required": "Offer description is required" }),
});

export const serviceSchema = Joi.object({
  type: Joi.string()
    .required()
    .messages({ "any.required": "Type is required" }),
  status: Joi.string()
    .required()
    .messages({ "any.required": "Status is required" }),
  offers: Joi.array()
    .items(offerSchema)
    .length(2)
    .required()
    .messages({ "any.required": "Offers are required" }),
});
