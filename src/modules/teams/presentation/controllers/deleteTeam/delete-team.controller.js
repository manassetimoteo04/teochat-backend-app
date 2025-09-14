import teamContainer from "../../../infrastructure/container/team-container.js";

export async function deleteTeam(req, res, next) {
  try {
    await teamContainer.deleteTeam.execute({
      userId: req.user.id,
      companyId: req.params.companyId,
      teamId: req.params.id,
    });

    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
}
