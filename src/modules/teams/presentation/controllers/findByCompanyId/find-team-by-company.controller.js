import teamContainer from "../../../infrastructure/container/team-container.js";

export async function findTeamByCompany(req, res, next) {
  try {
    const teams = await teamContainer.findTeamsByCompany.execute({
      companyId: req.params.companyId,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    next(error);
  }
}
