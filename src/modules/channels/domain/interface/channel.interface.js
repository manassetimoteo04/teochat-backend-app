export default class IChannelRepository {
  /**
   * @param {Channel} channel
   * @returns {Promise<Channel>}
   */
  create(channel) {
    throw new Error("METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @param {string} id
   * @returns {Promise<Channel | null>}
   */
  findById(id) {
    throw new Error("METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @param {string} teamId
   * @returns {Promise<Channel[]>}
   */
  findByTeam(teamId) {
    throw new Error("METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @param {string} name
   * @param {string} teamId
   * @returns {Promise<Channel | null>}
   */
  findByNameAndTeam(name, teamId) {
    throw new Error("METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @param {string} id
   * @returns {Promise<Channel>}
   */
  archive(id) {
    throw new Error("METHOD_NOT_IMPLEMENTED");
  }
}
