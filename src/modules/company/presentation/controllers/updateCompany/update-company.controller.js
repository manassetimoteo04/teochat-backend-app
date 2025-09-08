import companyContainer from "../../../infrastructure/container/company-container.js";

export async function updateCompany(req, res, next) {
  try {
    const company = await companyContainer.updateCompany.execute({
      ...req.body,
      id: req.params.id,
    });
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
