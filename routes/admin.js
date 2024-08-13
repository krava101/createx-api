import express from "express";
import auth from "../middleware/auth.js";
import admins from "../controllers/adminController.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", auth, jsonParser, admins.register);
router.post("/login", jsonParser, admins.login);

export default router;
