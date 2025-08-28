export class ICompanyRepository {
  async create(data) {
    throw new Error("Not implemented");
  }

  async findById(id) {
    throw new Error("Not implemented");
  }
  async findMembers(id) {
    throw new Error("Not implemented");
  }

  async addMember(companyId, userId) {
    throw new Error("Not implemented");
  }
  async update(id, updateData) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
}
