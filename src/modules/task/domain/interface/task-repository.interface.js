// tasks-repository.interface.js

export class ITasksRepository {
  async create(task) {
    throw new Error("Method not implemented");
  }

  async update(task) {
    throw new Error("Method not implemented");
  }

  async delete(taskId) {
    throw new Error("Method not implemented");
  }

  async findById(taskId) {
    throw new Error("Method not implemented");
  }

  async findByProject(projectId) {
    throw new Error("Method not implemented");
  }

  async findByAssignedUser(userId) {
    throw new Error("Method not implemented");
  }

  async findOverdue(projectId) {
    throw new Error("Method not implemented");
  }

  async save(task) {
    throw new Error("Method not implemented");
  }
}
