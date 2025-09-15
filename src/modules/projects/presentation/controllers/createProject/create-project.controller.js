import projectContainer from "../../../infrasctruture/container/project-container.js";

export async function createProject(req, res, next) {
  try {
    const data = await projectContainer.createProject.execute({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
