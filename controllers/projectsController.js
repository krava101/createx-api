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
  const isValid = projectSchema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({ message: isValid.error.details[0].message });
  }
  const project = req.body;
  try {
    const isExist = await Project.findOne(project);
    if (isExist) {
      return res.status(400).send({ message: "This project already exist" });
    }
    const newProject = await Project.create(project);
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
