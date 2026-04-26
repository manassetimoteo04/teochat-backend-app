import companyContainer from "../../../infrastructure/container/company-container.js";

export async function promoteCompanyMember(req, res, next) {
  try {
    const member = await companyContainer.promoteMemberToAdmin.execute({
      companyId: req.params.id,
      memberId: req.params.memberId,
      userId: req.user.id,
    });

    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
}
