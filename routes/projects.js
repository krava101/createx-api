import express from "express";
import projects from "../controllers/projectsController.js";
import { upload } from "../gallery.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", projects.getAllProjects);
router.post("/", jsonParser, upload.array("images"), projects.create);
router.get("/:id", projects.current);
router.patch("/:id", jsonParser, projects.update);
router.delete("/:id", projects.remove);

export default router;
