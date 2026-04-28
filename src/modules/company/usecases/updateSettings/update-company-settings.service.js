import { loadCompanyContext, ensureCompanyAdmin } from "../shared/company-permissions.js";

export class UpdateCompanySettingsService {
  constructor({ companyRepo, userRepo, assetService }) {
    this.companyRepo = companyRepo;
    this.userRepo = userRepo;
    this.assetService = assetService;
  }

  async execute({
    companyId,
    userId,
    name,
    ownerName,
    description,
    industry,
    logo,
    logoFile,
  }) {
    const { company, role } = await loadCompanyContext({
      companyRepo: this.companyRepo,
      userRepo: this.userRepo,
      companyId,
      userId,
    });

    ensureCompanyAdmin(role);

    let logoPayload = {};
    let previousLogoAsset = null;
    if (logoFile) {
      const uploadedLogo = await this.assetService.uploadCompanyLogo({
        companyId,
        file: logoFile,
      });

      previousLogoAsset = company.logoAsset;
      logoPayload = {
        logo: uploadedLogo.secureUrl,
        logoAsset: uploadedLogo,
      };
    } else if (logo) {
      logoPayload = { logo };
    }

    company.updateCompany({
      name,
      ownerName,
      description,
      industry,
      ...logoPayload,
    });
    const updatedCompany = await this.companyRepo.update(companyId, company);

    if (previousLogoAsset?.publicId) {
      await this.assetService.deleteAsset({
        publicId: previousLogoAsset.publicId,
        resourceType: previousLogoAsset.resourceType || "image",
      });
    }

    updatedCompany.members = undefined;
    return updatedCompany;
  }
}
