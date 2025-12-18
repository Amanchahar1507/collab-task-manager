import Notification from "../models/Notification.js"

export const createNotification = (data: any) =>
  Notification.create(data)

export const getUserNotifications = (userId: string) =>
  Notification.find({ userId }).sort({ createdAt: -1 })

export const markAsRead = (id: string) =>
  Notification.findByIdAndUpdate(id, { read: true })
