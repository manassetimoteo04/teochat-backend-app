import companyContainer from "../../../infrastructure/container/company-container.js";

export async function updateCompanySettings(req, res, next) {
  try {
    const company = await companyContainer.updateCompanySettings.execute({
      companyId: req.params.id,
      userId: req.user.id,
      ...req.body,
    });

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
