export class EventCanceledEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "EventCanceled";
  }
}
