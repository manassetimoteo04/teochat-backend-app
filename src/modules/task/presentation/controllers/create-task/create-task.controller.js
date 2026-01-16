import taskContainer from "../../../infrastructure/container/task-container";

export const createTask = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { title, description, priority, dueDate, assignedTo, tags } =
      req.body;

    const createdBy = req.user.id;

    const task = await taskContainer.createTask.execute({
      projectId,
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy,
      tags,
    });

    return res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
