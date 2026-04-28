import companyContainer from "../../../infrastructure/container/company-container.js";

function normalizeIndustry(industry) {
  if (Array.isArray(industry)) return industry;
  if (typeof industry !== "string") return industry;

  const trimmed = industry.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : [trimmed];
  } catch {
    return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
  }
}

export async function updateCompanySettings(req, res, next) {
  try {
    const company = await companyContainer.updateCompanySettings.execute({
      companyId: req.params.id,
      userId: req.user.id,
      ...req.body,
      industry: normalizeIndustry(req.body.industry),
      logoFile: req.file,
    });

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
}
