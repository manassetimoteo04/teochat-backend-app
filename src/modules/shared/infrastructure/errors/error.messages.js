export class CompanyNotFoundError extends Error {
  constructor(message = "Nenhuma empresa foi encontrada") {
    super(message);
    this.name = "CompanyNotFoundError";
  }
}
export class UserNotFoundError extends Error {
  constructor(message = "Nenhuma usuário foi encontrado") {
    super(message);
    this.name = "UserNotFoundError";
  }
}
export class NotCompanyMemberError extends Error {
  constructor(message = "Não és membro desta empresa") {
    super(message);
    this.name = "NotCompanyMemberError";
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message = "Usuário já existe") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}
