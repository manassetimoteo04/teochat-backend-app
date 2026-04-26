import companyContainer from "../../../infrastructure/container/company-container.js";

export async function removeCompanyMember(req, res, next) {
  try {
    const result = await companyContainer.removeCompanyMember.execute({
      companyId: req.params.id,
      memberId: req.params.memberId,
      userId: req.user.id,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
