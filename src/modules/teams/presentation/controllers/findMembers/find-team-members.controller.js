import teamContainer from "../../../infrastructure/container/team-container.js";

export async function findTeamMembers(req, res, next) {
  try {
    const members = await teamContainer.findTeamMembers.execute({
      userId: req.user.id,
      teamId: req.params.id,
      companyId: req.params.companyId,
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
}
