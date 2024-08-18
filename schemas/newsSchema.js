import Joi from "joi";

const newsPostSchema = Joi.object({
  type: Joi.string()
    .valid("preview-text", "main-text", "quote-text", "post-list")
    .required()
    .messages({ "any.required": "News post 'type' is required" }),
  text: Joi.array()
    .items(Joi.string())
    .min(1)
    .max(20)
    .required()
    .messages({ "any.required": "News post 'text' is required" }),
});

export const newsSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({ "any.required": "News 'title' is required" }),
  type: Joi.string()
    .valid(
      "Company News",
      "Expert Tips",
      "Industry News",
      "Innovation",
      "Marketing"
    )
    .required()
    .messages({
      "any.required": "News 'type' is required",
    }),
  date: Joi.string()
    .required()
    .messages({ "any.required": "News 'date' is required" }),
  posts: Joi.array()
    .items(newsPostSchema)
    .min(1)
    .max(20)
    .required()
    .messages({ "any.required": "News 'posts' is required" }),
});
