import taskContainer from "../../../infrastructure/container/task-container";

export async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    await taskContainer.deleteTask.execute(userId, id);
    res
      .status(204)
      .json({ success: true, message: "Tarefa excluida com sucesso" });
  } catch (error) {
    next(error);
  }
}
