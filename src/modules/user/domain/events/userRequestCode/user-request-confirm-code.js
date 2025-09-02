export class UserRequestConfirmCodeEvent {
  constructor(payload) {
    this.name = "UserRequestConfirmCode";
    this.payload = payload;
    this.occurredAt = new Date();
  }
}
