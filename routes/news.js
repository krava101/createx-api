import express from "express";
import news from "../controllers/newsController.js";
import auth from "../middleware/auth.js";
import download from "../middleware/downloadImages.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", news.getAll);
router.get("/:id", news.current);
router.post("/", auth, jsonParser, download.array("image"), news.create);

export default router;
