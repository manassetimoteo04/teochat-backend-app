export class UserConfirmedAccountEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "UserConfirmedAccount";
    this.occuredAt = new Date();
  }
}
