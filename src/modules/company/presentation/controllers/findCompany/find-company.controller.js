import companyContainer from "../../../infrastructure/container/company-container.js";

export async function findCompany(req, res, next) {
  try {
    const company = await companyContainer.findCompany.execute({
      userId: req.body.userId,
      companyId: req.params.id,
    });
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
