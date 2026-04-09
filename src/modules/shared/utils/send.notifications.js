let ioInstance = null;

export function setSocketServer(io) {
  ioInstance = io;
}

export function getUserRoom(userId) {
  return `user:${userId}`;
}

export function emitToUser(userId, event, payload) {
  if (!ioInstance || !userId) return;
  ioInstance.to(getUserRoom(userId)).emit(event, payload);
}

export function emitUnreadCount(userId, unreadCount) {
  emitToUser(userId, "notification:unread-count", { unreadCount });
}

export function emitNotificationCreated(userId, notification, unreadCount) {
  emitToUser(userId, "notification:new", { notification });
  emitUnreadCount(userId, unreadCount);
}

export function emitNotificationUpdated(userId, notification, unreadCount) {
  emitToUser(userId, "notification:updated", { notification });
  emitUnreadCount(userId, unreadCount);
}

export function emitNotificationDeleted(userId, notificationId, unreadCount) {
  emitToUser(userId, "notification:deleted", { notificationId });
  emitUnreadCount(userId, unreadCount);
}

export function emitAllNotificationsRead(userId, unreadCount) {
  emitToUser(userId, "notification:all-read", { unreadCount });
}

export function emitAllNotificationsDeleted(userId) {
  emitToUser(userId, "notification:all-deleted", { ok: true });
}
