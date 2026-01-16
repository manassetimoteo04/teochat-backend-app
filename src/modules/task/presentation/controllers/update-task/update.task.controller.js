import taskContainer from "../../../infrastructure/container/task-container";

export async function updateTask(req, res, next) {
  try {
    const data = await taskContainer.updateTask.execute({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
