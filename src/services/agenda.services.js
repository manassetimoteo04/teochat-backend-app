import Agenda from "../models/agenda.model.js";
import Event from "../models/events.model.js";
import Services from "./services.js";

class AgendaServices extends Services {
  constructor(req) {
    super();
    this.req = req;
  }
  async getAgendaById() {
    const agenda = await Agenda.findById(this.req.params.id);
    return agenda;
  }
  async getTeamAgenda() {
    const agenda = await Agenda.find({ teamId: this.req.params.teamId });
    return agenda;
  }
  async getAgendaEvents() {
    console.log(this.req.params.agendaId);
    const events = await Event.find({ agendaId: this.req.params.agendaId });
    return events;
  }
}
export default AgendaServices;
