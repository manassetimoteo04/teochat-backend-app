export class IProjectRepository {
  async create(data) {}
  async update(id, updateData) {}
  async delete(id) {}
  async findById(id) {}
  async findByTeamId(teamId, options = {}) {}
  async findTaks(id) {}
}
