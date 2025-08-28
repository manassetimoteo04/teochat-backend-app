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
export class InvitationNotFoundError extends Error {
  constructor(message = "Nenhum convite foi encontrado") {
    super(message);
    this.name = "InvitationNotFoundError";
  }
}
export class InvitationExpiredError extends Error {
  constructor(message = "Este convite está expirado") {
    super(message);
    this.name = "InvitationExpiredError";
  }
}
export class InvitationAlreadyAcceptedError extends Error {
  constructor(message = "Este convite já foi aceite") {
    super(message);
    this.name = "InvitationAlreadyAcceptedError";
  }
}
export class InvitationCanceledError extends Error {
  constructor(message = "Este convite  foi cancelado") {
    super(message);
    this.name = "InvitationCanceledError";
  }
}
export class InvitationNotDestitationError extends Error {
  constructor(message = "Este convite só é válido para o destinatário") {
    super(message);
    this.name = "InvitationNotDestitationError";
  }
}
