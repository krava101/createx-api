import express from "express";
import auth from "../middleware/auth.js";
import projects from "../controllers/projectsController.js";
import { upload } from "../gallery.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", projects.getAllProjects);
router.post("/", auth, jsonParser, upload.array("images"), projects.create);
router.get("/:id", auth, projects.current);
router.patch("/:id", auth, jsonParser, projects.update);
router.delete("/:id", auth, projects.remove);

export default router;
