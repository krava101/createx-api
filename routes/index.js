import express from "express";
import projects from "./projects.js";
import admin from "./admin.js";
import services from "./services.js";
import news from "./news.js";

const router = express.Router();

router.use("/projects", projects);
router.use("/admin", admin);
router.use("/services", services);
router.use("/news", news);

export default router;
