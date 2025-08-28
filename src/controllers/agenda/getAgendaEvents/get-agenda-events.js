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
