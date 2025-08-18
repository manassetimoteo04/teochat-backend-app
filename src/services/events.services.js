import agenda from "../jobs/index.js";
import Agenda from "../models/agenda.model.js";
import Company from "../models/company.model.js";
import Event from "../models/events.model.js";
import Services from "./services.js";

class EventServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async getEvent() {
    const events = await Event.findById(this.req.params.eventId);
    return events;
  }
  async createEvent() {
    this.restrictedActions(["admin", "super_admin"], this.req.user.role);
    const { agendaId, start, end } = this.req.body;
    const conflict = await Event.findOne({
      agendaId,
      $or: [
        {
          start: { $lt: end },
          end: { $gt: start },
        },
      ],
    });
    if (conflict) {
      const error = new Error(
        "Já existe um evento neste horário para essa agenda."
      );
      error.statusCode = 409;
      throw error;
    }

    const companyName = await Company.findById(this.req.company).select("name");
    const teamName = await Agenda.findById(this.req.body.agendaId)
      .populate("teamId")
      .select("teamId");
    const events = await Event.create({
      createdBy: this.req.user.id,
      participants: [
        this.req.user.id,
        this.req.user.id,
        this.req.user.id,
        this.req.user.id,
      ],
      ...this.req.body,
    });
    const reminderTime = new Date(Date.now() * 60 * 1000);
    console.log(companyName.name, teamName.teamId.name);
    await agenda.schedule(reminderTime, "sendEventReminders", {
      eventId: events._id,
      participants: events.participants,
      time: reminderTime,
      companyName: companyName.name,
      teamName: teamName.teamId.name,
    });
    return events;
  }
  async updateEvent() {
    this.restrictedActions(["admin", "super_admin"], this.req.user.role);
    const { agendaId, start, end } = this.req.body;
    const conflict = await Event.findOne({
      agendaId,
      _id: { $ne: this.req.params.id },
      $or: [
        {
          start: { $lt: end },
          end: { $gt: start },
        },
      ],
    });
    if (conflict) {
      const error = new Error(
        "Já existe um evento neste horário para essa agenda."
      );
      error.statusCode = 409;
      throw error;
    }
    const events = await Event.findByIdAndUpdate(
      this.req.params.eventId,
      this.req.body
    );
    return events;
  }
  async deleteEvent() {
    this.restrictedActions(["admin", "super_admin"], this.req.user.role);

    await Event.findByIdAndDelete(this.req.params.eventId);
  }
}
export default EventServices;
