import MessageServices from "../services/message.services.js";

export const getTeamMessages = async (req, res, next) => {
  try {
    const services = new MessageServices(req);
    const { messages } = await services.getTeamMessages();
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

export const createMessages = async (req, res, next) => {
  try {
    const services = new MessageServices(req);
    const { message } = await services.createMessages();
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const updatedMessage = async (req, res, next) => {
  try {
    const services = new MessageServices(req);
    const { message } = await services.updateMessage();
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};
export const deleteMessage = async (req, res, next) => {
  try {
    const services = new MessageServices(req);

    await services.deleteMessage();
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};
