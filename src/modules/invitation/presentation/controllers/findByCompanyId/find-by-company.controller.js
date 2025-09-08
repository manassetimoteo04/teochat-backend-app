import invitationContainer from "../../../infrastructure/container/invitation-container.js";

export async function findInvitationByCompany(req, res, next) {
  try {
    const invitations = await invitationContainer.findByCompany.execute({
      companyId: req.params.id,
      userId: req.body.userId,
    });

    res.status(200).json({ success: true, data: invitations });
  } catch (error) {
    next(error);
  }
}
