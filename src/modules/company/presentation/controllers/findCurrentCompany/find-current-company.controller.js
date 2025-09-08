import companyContainer from "../../../infrastructure/container/company-container.js";

export async function findCurrentCompany(req, res, next) {
  try {
    const company = await companyContainer.findCurrentCompany.execute({
      userId: req.user.id,
      companyId: req.params.id,
    });
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
