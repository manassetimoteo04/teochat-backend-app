import AgendaServices from "../../../services/agenda.services";

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
