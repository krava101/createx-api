import { clearTmpFolder } from "../helpers/clearTmp.js";
import uploadImagesFromTmp from "../helpers/uploadImagesFromTmp.js";
import Project from "../models/projects.js";
import {
  projectSchema,
  projectIdSchema,
  projectUpdateSchema,
} from "../schemas/projectSchema.js";

async function getAllProjects(req, res, next) {
  try {
    const projects = await Project.find();
    return res.status(200).send(projects);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const project = req.body;
  const files = req.files;
  const isValid = projectSchema.validate(project);

  if (isValid.error) {
    await clearTmpFolder();
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  if (files.length < 3) {
    await clearTmpFolder();
    return res.status(400).send({ message: "Atleast 3 images required" });
  }
  if (files.length > 6) {
    await clearTmpFolder();
    return res.status(400).send({ message: "Maximum number of images is 6" });
  }

  try {
    const newImages = await uploadImagesFromTmp(files, "projects");
    const images = newImages.map((file) => ({
      src: `/${file.asset_folder}/${file.original_filename.split(".")[0]}`,
    }));
    const newProject = await Project.create({ ...project, images });

    return res.status(201).send(newProject);
  } catch (e) {
    next(e);
  }
}

async function current(req, res, next) {
  const isValid = projectIdSchema.validate(req.params.id);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    return res.status(200).send(project);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  const isValid = projectIdSchema.validate(req.params.id);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  const isProjectValid = projectUpdateSchema.validate(req.body);
  if (isProjectValid.error) {
    return res
      .status(400)
      .send({ message: isProjectValid.error.details[0].message });
  }
  const projectId = req.params.id;
  const projectToUpdate = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      projectToUpdate,
      { new: true }
    );
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    return res.status(200).send(project);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  const isValid = projectIdSchema.validate(req.params.id);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  const projectId = req.params.id;

  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    return res
      .status(200)
      .send({ message: `Project with id: ${projectId} deleted` });
  } catch (e) {
    next(e);
  }
}

export default { getAllProjects, create, current, update, remove };
