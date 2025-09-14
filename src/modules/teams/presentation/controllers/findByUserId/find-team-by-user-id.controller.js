import teamContainer from "../../../infrastructure/container/team-container.js";

export async function findTeamByUserId(req, res, next) {
  try {
    const teams = await teamContainer.findTeamsByUserId.execute({
      companyId: req.params.companyId,
      userId: req.body.userId,
    });
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    next(error);
  }
}
