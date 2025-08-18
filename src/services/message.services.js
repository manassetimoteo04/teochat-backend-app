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
    if (!team) {
      const error = new Error("Nenhuma equipe foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
    const isMember = team.members.some((t) => t.equals(this.req.user.id));
    if (!isMember) {
      const error = new Error(
        "Não podes executar esta acção, não és membro deste team"
      );
      error.statusCode = 401;
      throw error;
    }
    // const messages = await Message.find({ teamId: this.req.params.teamId });
    const messages = await Message.aggregate([
      { $unwind: "$createdAt" },
      {
        $match: {
          teamId: this.req.params.teamId,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          messages: { $push: "senderId contentType content" },
        },
      },
    ]);
    return { messages };
  }
  async createMessages() {
    const newMessage = { ...this.req.body, senderId: this.req.user.id };
    const message = await Message.create(newMessage);
    return { message };
  }
  async updateMessage() {
    const message = await Message.findById(this.req.params.id);
    if (!message) {
      const error = new Error("Nenhuma mensagem foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
    const isSender = message.senderId.equals(this.req.user.id);
    if (!isSender) {
      const error = new Error("Não podes editar esta mensagem, não és o autor");
      error.statusCode = 401;
      throw error;
    }
    const updatedMessage = await Message.findByIdAndUpdate(
      this.req.params.id,
      this.req.body,
      { new: true }
    );
    return { message: updatedMessage };
  }
  async deleteMessage() {
    const message = await Message.findById(this.req.params.teamId);
    if (!message) {
      const error = new Error("Nenhuma mensagem foi encontrada com este id");
      error.statusCode = 404;
      throw error;
    }
    const isSender = message.senderId === this.req.user.id;
    if (!isSender) {
      const error = new Error("Não podes exluir esta mensagem, não és o autor");
      error.statusCode = 401;
      throw error;
    }
    await Message.findByIdAndDelete(this.req.params.teamId);
  }
}

export default MessageServices;
