import express from "express";
import services from "../controllers/servicesController.js";
import auth from "../middleware/auth.js";
import download from "../middleware/downloadImages.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", services.getServices);
router.post("/", auth, jsonParser, download.array("images"), services.create);

export default router;
