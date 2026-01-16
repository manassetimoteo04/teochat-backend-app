export class CompanyNotFoundError extends Error {
  constructor(message = "A empresa informada não foi encontrada no sistema.") {
    super(message);
    this.name = "CompanyNotFoundError";
  }
}

export class UserNotFoundError extends Error {
  constructor(
    message = "O usuário especificado não existe ou não foi localizado."
  ) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class NotCompanyMemberError extends Error {
  constructor(message = "Você não tem permissão: não é membro desta empresa.") {
    super(message);
    this.name = "NotCompanyMemberError";
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(
    message = "Já existe um usuário cadastrado com estas credenciais."
  ) {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class InvitationNotFoundError extends Error {
  constructor(
    message = "O convite informado não foi encontrado ou não existe."
  ) {
    super(message);
    this.name = "InvitationNotFoundError";
  }
}

export class InvitationExpiredError extends Error {
  constructor(message = "Este convite expirou e não pode mais ser utilizado.") {
    super(message);
    this.name = "InvitationExpiredError";
  }
}

export class InvitationAlreadyAcceptedError extends Error {
  constructor(message = "Este convite já foi aceito anteriormente.") {
    super(message);
    this.name = "InvitationAlreadyAcceptedError";
  }
}

export class InvitationCanceledError extends Error {
  constructor(message = "Este convite foi cancelado e não é mais válido.") {
    super(message);
    this.name = "InvitationCanceledError";
  }
}

export class InvitationNotDestitationError extends Error {
  constructor(
    message = "Este convite não pertence a você: somente o destinatário correto pode utilizá-lo."
  ) {
    super(message);
    this.name = "InvitationNotDestitationError";
  }
}

export class TeamNotFoundError extends Error {
  constructor(
    message = "A equipe informado não foi encontrado ou não existe."
  ) {
    super(message);
    this.name = "TeamNotFoundError";
  }
}

export class NotTeamMemberError extends Error {
  constructor(message = "Você não tem permissão: não é membro desta equipe.") {
    super(message);
    this.name = "NotTeamMemberError";
  }
}
export class NotTeamCompanyError extends Error {
  constructor(
    message = "Você não tem permissão: não podes acessar a quipe de outra empresa."
  ) {
    super(message);
    this.name = "NotTeamCompanyError";
  }
}
export class InvalidConfirmCodeError extends Error {
  constructor(
    message = "Código de confirmação inválido, por favor verifique o teu email"
  ) {
    super(message);
    this.name = "InvalidConfirmCodeError";
  }
}
export class EmailOrPasswordInvalidError extends Error {
  constructor(message = "Email ou palavra-passe errada") {
    super(message);
    this.name = "EmailOrPasswordInvalidError";
  }
}
export class ExpiredConfirmCodeError extends Error {
  constructor(
    message = "Código de confirmação expirado, por favor solicite outro"
  ) {
    super(message);
    this.name = "ExpiredConfirmCodeError";
  }
}
export class EventNotFoundError extends Error {
  constructor(
    message = "O Evento informado não foi encontrado ou não existe."
  ) {
    super(message);
    this.name = "EventNotFoundError";
  }
}
export class EventTimeConflictError extends Error {
  constructor(
    message = " Já existe um evento neste horário para esta agenda."
  ) {
    super(message);
    this.name = "EventTimeConflictError";
  }
}

export class ProjectNotFoundError extends Error {
  constructor(
    message = "O projecto informado não foi encontrado ou não existe."
  ) {
    super(message);
    this.name = "ProjectNotFoundError";
  }
}
export class NotProjectTeamError extends Error {
  constructor(
    message = "Você não tem permissão: não podes acessar projecto de outra equipa."
  ) {
    super(message);
    this.name = "NotProjectTeamError";
  }
}

export class TaskNotFoundError extends Error {
  constructor(
    message = "A tarefa informada não foi encontrada ou não existe."
  ) {
    super(message);
    this.name = "TaskNotFoundError";
  }
}

export class NotTaskAssigneeError extends Error {
  constructor(
    message = "Você não tem permissão: não é o responsável por esta tarefa."
  ) {
    super(message);
    this.name = "NotTaskAssigneeError";
  }
}

export class NotTaskCreatorError extends Error {
  constructor(
    message = "Você não tem permissão: não foi quem criou esta tarefa."
  ) {
    super(message);
    this.name = "NotTaskCreatorError";
  }
}

export class NotTaskProjectError extends Error {
  constructor(
    message = "Você não tem permissão: esta tarefa pertence a outro projeto."
  ) {
    super(message);
    this.name = "NotTaskProjectError";
  }
}

export class TaskAlreadyCompletedError extends Error {
  constructor(message = "Esta tarefa já foi concluída.") {
    super(message);
    this.name = "TaskAlreadyCompletedError";
  }
}

export class InvalidTaskStatusError extends Error {
  constructor(message = "O status da tarefa é inválido ou não permitido.") {
    super(message);
    this.name = "InvalidTaskStatusError";
  }
}

export class TaskAlreadyAssignedError extends Error {
  constructor(message = "Esta tarefa já está atribuída a um usuário.") {
    super(message);
    this.name = "TaskAlreadyAssignedError";
  }
}

export class TaskNotAssignedError extends Error {
  constructor(message = "Esta tarefa ainda não possui um responsável.") {
    super(message);
    this.name = "TaskNotAssignedError";
  }
}

export class TaskDueDateExpiredError extends Error {
  constructor(
    message = "O prazo desta tarefa já expirou e não pode ser alterado."
  ) {
    super(message);
    this.name = "TaskDueDateExpiredError";
  }
}

export class InvalidTaskDataError extends Error {
  constructor(message = "Os dados informados para a tarefa são inválidos.") {
    super(message);
    this.name = "InvalidTaskDataError";
  }
}
