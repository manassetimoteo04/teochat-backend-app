import AgendaServices from "../services/agenda.services.js";

export async function getAgendaById(req, res, next) {
  try {
    const services = new AgendaServices(req);
    const agenda = await services.getAgendaById();
    res.status(200).json({
      success: true,
      data: agenda,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTeamAgenda(req, res, next) {
  try {
    const services = new AgendaServices(req);
    const agenda = await services.getTeamAgenda();
    res.status(200).json({
      success: true,
      data: agenda,
    });
  } catch (error) {
    next(error);
  }
}
export async function getAgendaEvents(req, res, next) {
  try {
    const services = new AgendaServices(req);
    const agenda = await services.getAgendaEvents();
    res.status(200).json({
      success: true,
      data: agenda,
    });
  } catch (error) {
    next(error);
  }
}
