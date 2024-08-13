import express from "express";
import projects from "./projects.js";
import admin from "./admin.js";

const router = express.Router();

router.use("/projects", projects);
router.use("/admin", admin);

export default router;
