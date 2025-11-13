import teamContainer from "../../../infrastructure/container/team-container.js";

export async function createTeam(req, res, next) {
  try {
    const team = await teamContainer.createTeam.execute({
      userId: req.user.id,
      ...req.params,
      ...req.body,
    });
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
}
