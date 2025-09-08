import invitationContainer from "../../../infrastructure/container/invitation-container.js";

export async function createInvitation(req, res, next) {
  try {
    const invitation = await invitationContainer.createInvitation.execute({
      ...req.params,
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: invitation });
  } catch (error) {
    next(error);
  }
}
