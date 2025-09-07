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
  async findByTime({ agenda, startTime, endTime, id }) {
    throw new Error("Not implemented");
  }
  async findByAgenda(agenda) {
    throw new Error("Not implemented");
  }
}
