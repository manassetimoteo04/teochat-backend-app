import teamContainer from "../../../infrastructure/container/team-container.js";

export async function addTeamMember(req, res, next) {
  try {
    const data = await teamContainer.addTeamMember.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
