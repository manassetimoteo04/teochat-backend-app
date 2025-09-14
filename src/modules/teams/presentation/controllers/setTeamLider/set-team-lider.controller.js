import teamContainer from "../../../infrastructure/container/team-container.js";

export async function setTeamLider(req, res, next) {
  try {
    const data = await teamContainer.setTeamLider.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
      memberId: req.body.memberId,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
