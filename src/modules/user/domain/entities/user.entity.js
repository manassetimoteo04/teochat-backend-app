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

  confirmAccount(code) {
    if (this.confirmCode !== code) {
      throw new Error("Código de confirmação inválido");
    }
    if (this.confirmExpiresIn && this.confirmExpiresIn < new Date()) {
      throw new Error("Código expirado");
    }
    this.isConfirmed = true;
    this.confirmCode = undefined;
    this.confirmExpiresIn = undefined;
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
}
