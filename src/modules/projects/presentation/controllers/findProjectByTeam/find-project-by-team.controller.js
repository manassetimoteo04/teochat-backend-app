import projectContainer from "../../../infrasctruture/container/project-container.js";

export async function findProjectByTeam(req, res, next) {
  try {
    const data = await projectContainer.findProjectByTeam.execute({
      ...req.params,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
