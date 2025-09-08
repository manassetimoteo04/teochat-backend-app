import invitationContainer from "../../../infrastructure/container/invitation-container.js";

export async function cancelInvitation(req, res, next) {
  try {
    const invitation = await invitationContainer.cancelInvitation.execute({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
