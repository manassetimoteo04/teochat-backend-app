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
