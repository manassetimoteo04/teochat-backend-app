import invitationContainer from "../../../infrastructure/container/invitation-container.js";

export async function findInvitation(req, res, next) {
  try {
    const invitation = await invitationContainer.findInvitation.execute({
      ...req.params,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
