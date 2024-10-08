import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";

const tmpDirectory =
  process.env.NODE_ENV === "production" ? "/tmp" : path.resolve("tmp");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tmpDirectory);
  },
  filename(req, file, cb) {
    const originalname = file.originalname.replace(/\s/g, "_");
    cb(null, `${nanoid()}_${originalname}`);
  },
});

export default multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(HttpError(400, "Only images are allowed"));
  },
});
