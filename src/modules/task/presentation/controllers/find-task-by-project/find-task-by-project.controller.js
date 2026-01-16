import taskContainer from "../../../infrastructure/container/task-container";

export const findTaskByProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const task = await taskContainer.findTaskByProject.execute(projectId);

    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};
