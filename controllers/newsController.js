import { clearTmpFolder } from "../helpers/clearTmp.js";
import { customPathCloudinary } from "../helpers/customPathCloudinary.js";
import uploadImagesFromTmp from "../helpers/uploadImagesFromTmp.js";
import News from "../models/news.js";
import { newsSchema } from "../schemas/newsSchema.js";
import { idSchema } from "../schemas/schemas.js";

async function getAll(req, res, next) {
  try {
    const news = await News.find();
    return res.status(200).send(news);
  } catch (e) {
    next(e);
  }
}

async function current(req, res, next) {
  const newsId = req.params.id;
  const isIdValid = idSchema.validate(newsId);
  if (isIdValid.error) {
    return res
      .status(400)
      .send({ message: isIdValid.error.details[0].message });
  }
  try {
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).send({ message: "News not found" });
    }
    return res.status(200).send(news);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const files = req.files;
  const news = req.body;
  news.posts = JSON.parse(req.body.posts);
  const isValid = newsSchema.validate(news);

  if (!files.length) {
    await clearTmpFolder(files);
    return res.status(400).send({ message: "News 'image' required" });
  }
  if (files.length > 1) {
    await clearTmpFolder(files);
    return res
      .status(400)
      .send({ message: "Only 1 'image' allowed for 1 news" });
  }
  if (isValid.error) {
    await clearTmpFolder(files);
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  try {
    const images = await uploadImagesFromTmp(files, "news");
    const newImage = images[0];
    const image = { src: customPathCloudinary(newImage) };

    const newNews = await News.create({ ...news, image });
    return res.status(201).send(newNews);
  } catch (e) {
    next(e);
  }
}

export default { getAll, create, current };
