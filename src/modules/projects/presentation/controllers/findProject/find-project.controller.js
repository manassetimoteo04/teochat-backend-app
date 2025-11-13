import projectContainer from "../../../infrasctruture/container/project-container.js";

export async function findProject(req, res, next) {
  try {
    const data = await projectContainer.findProject.execute({
      userId: req.user.id,
      id: req.params.id,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
