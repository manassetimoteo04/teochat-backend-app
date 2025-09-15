import projectContainer from "../../../infrasctruture/container/project-container.js";

export async function deleteProject(req, res, next) {
  try {
    await projectContainer.deleteProject.execute({ ...req.params });
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
}
