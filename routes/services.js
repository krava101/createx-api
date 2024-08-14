import express from "express";
import services from "../controllers/servicesController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", services.getServices);
router.post("/", auth, jsonParser, services.create);

export default router;
