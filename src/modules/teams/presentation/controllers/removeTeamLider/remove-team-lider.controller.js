import teamContainer from "../../../infrastructure/container/team-container.js";

export async function removeTeamLider(req, res, next) {
  try {
    const data = await teamContainer.removeTeamLider.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
