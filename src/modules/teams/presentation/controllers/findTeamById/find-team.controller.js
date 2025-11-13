import teamContainer from "../../../infrastructure/container/team-container.js";

export async function findTeam(req, res, next) {
  try {
    const team = await teamContainer.findTeam.execute({
      userId: req.user.id,
      teamId: req.params.id,
      companyId: req.params.companyId,
    });
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
}
