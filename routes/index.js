import express from "express";
import projects from "./projects.js";

const router = express.Router();

router.use("/projects", projects);

export default router;
