import * as repo from "../repositories/notification.repository.js"

export const notifyAssignment = async (userId: string, title: string) => {
  return repo.createNotification({
    userId,
    message: `Task assigned: ${title}`
  })
}

export const getNotificationsService = (userId: string) =>
  repo.getUserNotifications(userId)

export const readNotificationService = (id: string) =>
  repo.markAsRead(id)
