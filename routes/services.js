import express from "express";
import services from "../controllers/servicesController.js";
import auth from "../middleware/auth.js";
import download from "../middleware/downloadImages.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", services.getServices);
router.get("/:id", auth, services.current);
router.post("/", auth, jsonParser, download.array("image"), services.create);
router.patch("/:id", auth, jsonParser, services.update);
router.delete("/:id", auth, services.remove);

export default router;
