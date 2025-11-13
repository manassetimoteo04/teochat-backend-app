import teamContainer from "../../../infrastructure/container/team-container.js";

export async function removeTeamMember(req, res, next) {
  try {
    const data = await teamContainer.removeTeamMember.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
      memberId: req.params.memberId,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
