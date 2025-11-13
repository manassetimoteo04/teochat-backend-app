import companyContainer from "../../../infrastructure/container/company-container.js";

export async function createCompany(req, res, next) {
  try {
    const company = await companyContainer.createCompany.execute({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
