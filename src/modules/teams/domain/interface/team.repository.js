export class ITeamsRepository {
  async create(data) {
    throw new Error("Not implemented");
  }
  async findByCompanyId(id) {
    throw new Error("Not implemented");
  }

  async findById(id) {
    throw new Error("Not implemented");
  }

  async findMembers(id) {
    throw new Error("Not implemented");
  }

  async findByUserId(userId) {
    throw new Error("Not implemented");
  }

  async update(id, updateData) {
    throw new Error("Not implemented");
  }

  async addMember(id, membersData = []) {
    throw new Error("Not implemented");
  }

  async setLider(id, liderId) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
}
