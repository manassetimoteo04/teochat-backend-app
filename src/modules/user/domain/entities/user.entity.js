export class UserEntity {
  constructor({
    id,
    name,
    email,
    password,
    avatar = "/default-user.jpg",
    companies = [],
    isConfirmed = false,
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
}
