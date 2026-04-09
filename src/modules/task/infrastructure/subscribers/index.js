import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import notificationContainer from "../../../notifications/infrastructure/container/notification-container.js";

function buildTaskAction({ companyId, teamId, projectId }) {
  return {
    kind: "navigate",
    label: "Abrir tarefa",
    path: `/companies/${companyId}/teams/${teamId}/projects/${projectId}`,
    apiPath: `/api/v1/tasks/${projectId}/projects`,
    method: "GET",
  };
}

function buildTaskEntity(taskId) {
  return {
    id: taskId,
    kind: "task",
  };
}

function pushNotification(items, userId, payload) {
  if (!userId) return;
  items.push({ userId, ...payload });
}

export function registerTaskSubscribers() {
  eventBus.on("TaskCreated", async (event) => {
    const notifications = [];
    const assigneeId = event.payload.assignedTo?.id;
    if (assigneeId && assigneeId !== event.payload.actor?.id) {
      pushNotification(notifications, assigneeId, {
        type: "task_created",
        category: "tasks",
        title: "Nova tarefa criada",
        message: `${event.payload.title} foi criada e atribuida a ti.`,
        action: buildTaskAction(event.payload),
        actor: event.payload.actor || null,
        entity: buildTaskEntity(event.payload.taskId),
        metadata: { ...event.payload, source: "task_created" },
      });
    }

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("TaskAssigned", async (event) => {
    if (!event.payload.assigneeId) return;

    await notificationContainer.createNotification.execute({
      userId: event.payload.assigneeId,
      type: "task_assigned",
      category: "tasks",
      title: "Nova atribuicao de tarefa",
      message:
        event.payload.previousAssigneeId && event.payload.previousAssigneeId !== event.payload.assigneeId
          ? `${event.payload.title} foi reatribuida para ti.`
          : `${event.payload.title} foi atribuida para ti.`,
      action: buildTaskAction(event.payload),
      actor: event.payload.actor || null,
      entity: buildTaskEntity(event.payload.taskId),
      metadata: { ...event.payload, source: "task_assigned" },
    });
  });

  eventBus.on("TaskUpdated", async (event) => {
    const recipients = new Set();
    const assignedId = event.payload.assignedTo?.id;
    const creatorId = event.payload.createdBy?.id;
    const actorId = event.payload.actor?.id;

    if (assignedId && assignedId !== actorId) recipients.add(assignedId);
    if (creatorId && creatorId !== actorId) recipients.add(creatorId);

    const notifications = [...recipients].map((userId) => ({
      userId,
      type: "task_updated",
      category: "tasks",
      title: "Tarefa atualizada",
      message: `${event.payload.title} recebeu uma atualização.`,
      action: buildTaskAction(event.payload),
      actor: event.payload.actor || null,
      entity: buildTaskEntity(event.payload.taskId),
      metadata: { ...event.payload, source: "task_updated" },
    }));

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });

  eventBus.on("TaskCompleted", async (event) => {
    const creatorId = event.payload.createdBy?.id;
    if (!creatorId || creatorId === event.payload.actor?.id) return;

    await notificationContainer.createNotification.execute({
      userId: creatorId,
      type: "task_completed",
      category: "tasks",
      title: "Tarefa concluida",
      message: `${event.payload.title} foi marcada como concluida.`,
      action: buildTaskAction(event.payload),
      actor: event.payload.actor || null,
      entity: buildTaskEntity(event.payload.taskId),
      metadata: { ...event.payload, source: "task_completed" },
    });
  });

  eventBus.on("TaskDueReminder", async (event) => {
    const notifications = [];
    const assigneeId = event.payload.assignedTo?.id;
    const creatorId = event.payload.createdBy?.id;

    if (assigneeId) {
      pushNotification(notifications, assigneeId, {
        type: "task_due_soon",
        category: "tasks",
        title: "Prazo da tarefa a aproximar-se",
        message: `${event.payload.title} vence em breve.`,
        action: buildTaskAction(event.payload),
        actor: event.payload.createdBy || null,
        entity: buildTaskEntity(event.payload.taskId),
        metadata: { ...event.payload, source: "task_due_soon" },
      });
    }

    if (creatorId && creatorId !== assigneeId) {
      pushNotification(notifications, creatorId, {
        type: "task_due_soon",
        category: "tasks",
        title: "Prazo da tarefa a aproximar-se",
        message: `${event.payload.title} vence em breve.`,
        action: buildTaskAction(event.payload),
        actor: event.payload.assignedTo || null,
        entity: buildTaskEntity(event.payload.taskId),
        metadata: { ...event.payload, source: "task_due_soon" },
      });
    }

    if (notifications.length) {
      await notificationContainer.createNotification.executeMany(notifications);
    }
  });
}
