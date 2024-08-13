import express from "express";
import projects from "../controllers/projectsController.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", projects.getAllProjects);
router.post("/", jsonParser, projects.create);
router.get("/:id", projects.current);
router.patch("/:id", jsonParser, projects.update);
router.delete("/:id", projects.remove);

export default router;
