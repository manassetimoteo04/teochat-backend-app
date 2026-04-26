export class UserEntity {
  constructor({
    id,
    name,
    email,
    password,
    avatar = "/default-user.jpg",
    companies = [],
    isConfirmed = false,
    isActive = true,
    confirmCode = undefined,
    confirmExpiresIn = undefined,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.companies = companies;
    this.isConfirmed = isConfirmed;
    this.isActive = isActive;
    this.confirmCode = confirmCode;
    this.confirmExpiresIn = confirmExpiresIn;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isCodeValid(code) {
    return this.confirmCode === code;
  }
  isCodeExpired() {
    return this.confirmExpiresIn && this.confirmExpiresIn < new Date();
  }

  joinCompany(companyId, role = "member") {
    const alreadyJoined = this.companies.some((c) => c.companyId === companyId);
    if (alreadyJoined) {
      throw new Error("Usuário já faz parte da empresa");
    }

    this.companies.push({
      companyId,
      role,
      joined: new Date(),
    });
  }
  getCompanies() {
    return this.companies.map((com) => ({
      role: com.role,
      joined: com.joined,
      company: com.companyId,
    }));
  }

  getCompanyMembership(companyId) {
    return (
      this.companies.find(
        ({ companyId: currentCompanyId }) =>
          currentCompanyId?.toString() === companyId?.toString(),
      ) || null
    );
  }

  getCompanyRole(companyId) {
    return this.getCompanyMembership(companyId)?.role || null;
  }

  isCompanyAdmin(companyId) {
    const role = this.getCompanyRole(companyId);
    return role === "admin" || role === "super_admin";
  }

  isCompanySuperAdmin(companyId) {
    return this.getCompanyRole(companyId) === "super_admin";
  }
}
