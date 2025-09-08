import invitationContainer from "../../../infrastructure/container/invitation-container.js";
export async function acceptInvitation(req, res, next) {
  try {
    const invitation = await invitationContainer.acceptInvitation.execute({
      id: req.params.id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
