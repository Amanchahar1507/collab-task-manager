import { Response } from "express"
import * as service from "../services/notification.service.js"

export const getNotifications = async (req: any, res: Response) => {
  const data = await service.getNotificationsService(req.userId)
  res.json(data)
}

export const markRead = async (req: any, res: Response) => {
  await service.readNotificationService(req.params.id)
  res.status(204).send()
}
