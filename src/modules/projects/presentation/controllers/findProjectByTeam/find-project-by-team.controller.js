import projectContainer from "../../../infrasctruture/container/project-container.js";

export async function findProjectByTeam(req, res, next) {
  try {
    const { data, meta } = await projectContainer.findProjectByTeam.execute({
      teamId: req.params.teamId,
      query: req.query.query,
      range: req.query.range,
      status: req.query.status,
      sort: req.query.sort,
      page: req.query.page,
      limit: req.query.limit,
      timezone: req.query.timezone,
    });
    res.status(200).json({ success: true, data, meta });
  } catch (error) {
    next(error);
  }
}
