import Message from "../models/message.model.js";
import Team from "../models/team.model.js";

import Services from "./services.js";

class MessageServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async getTeamMessages() {
    const team = await Team.findById(this.req.params.teamId);
    const isMember = team.members.some((t) => t === this.req.user.id);
    if (
      (!isMember && this.req.user !== "admin") ||
      this.req.user !== "super_admin"
    ) {
      const error = new Error(
        "Não podes executar esta acção, não és membro deste team"
      );
      error.statusCode = 401;
      throw error;
    }
    const messages = await Message.find({ teamId: this.req.params.teamId });
    return { messages };
  }
  async createMessages() {
    const newMessage = { ...this.req.body, senderId: this.req.user.id };
    const message = await Message.create(newMessage);
    return { message };
  }
  async updateMessage() {
    const message = await Message.findById(this.req.params.teamId);
    if (!message) {
      const error = new Error("Nenhuma mensagem foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
    const isSender = message.senderId === this.req.user.id;
    if (!isSender) {
      const error = new Error("Nenhuma mensagem foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
    const updatedMessage = await Message.findByIdAndUpdate(
      this.req.params.teamId,
      this.req.body,
      { new: true }
    );
    return { message: updatedMessage };
  }
}

export default MessageServices;
