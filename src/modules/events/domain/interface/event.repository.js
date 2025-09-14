export class IEventRepository {
  async findById(id) {
    throw new Error("Not implemented");
  }
  async create(eventData) {
    throw new Error("Not implemented");
  }
  async update(id, eventData) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
  async findByTime({ teamId, startTime, endTime, id }) {
    throw new Error("Not implemented");
  }
  async findByTeamId(agenda) {
    throw new Error("Not implemented");
  }
}
