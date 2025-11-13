import companyContainer from "../../../infrastructure/container/company-container.js";

export async function deleteCompany(req, res, next) {
  try {
    await companyContainer.deleteCompany.execute({
      ...req.body,
      companyId: req.params.id,
    });
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
}
