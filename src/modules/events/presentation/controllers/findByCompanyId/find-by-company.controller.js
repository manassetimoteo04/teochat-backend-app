import eventContainer from "../../../infrastructure/container/event-container.js";

export async function findEventByCompanyId(req, res, next) {
  try {
    const data = await eventContainer.findByCompany.execute({
      companyId: req.params.companyId,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
