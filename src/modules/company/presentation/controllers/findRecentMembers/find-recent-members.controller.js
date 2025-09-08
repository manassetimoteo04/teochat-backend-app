import companyContainer from "../../../infrastructure/container/company-container.js";

export async function findRecentMembers(req, res, next) {
  try {
    const members = await companyContainer.findRecentMembers.execute({
      companyId: req.params.id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
}
