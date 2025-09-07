export class EventEntity {
  constructor({
    id,
    agenda,
    title,
    description,
    date,
    startTime,
    status,
    endTime,
    type,
    location,
    createdBy,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.agenda = agenda;
    this.title = title;
    this.description = description;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.type = type;
    this.location = location;
    this.status = status;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
