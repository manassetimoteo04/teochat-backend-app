import projectContainer from "../../../infrasctruture/container/project-container.js";

export async function updateProject(req, res, next) {
  try {
    const data = await projectContainer.updateProject.execute({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
