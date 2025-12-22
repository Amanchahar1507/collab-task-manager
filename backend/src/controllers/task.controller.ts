import { Request, Response } from "express"
import * as service from "../services/task.service.js"
import { createTaskDto, updateTaskDto } from "../validators/task.dto.js"
import { notifyAssignment } from "../services/notification.service.js"

export const createTask = async (req: any, res: Response) => {
  try {
    const data = createTaskDto.parse(req.body)
    const task = await service.createTaskService(data, req.userId)
    res.status(201).json(task)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const getDashboard = async (req: any, res: Response) => {
  const data = await service.getUserDashboardService(req.userId)
  res.json(data)
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await service.deleteTaskService(req.params.id)
    req.app.get("io").emit("task:updated")
    res.status(204).send()
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
}


export const updateTask = async (req: any, res: Response) => {
  const data = updateTaskDto.parse(req.body)
  const task = await service.updateTaskService(req.params.id, data)

  if (data.assignedToId) {
    const notification = await notifyAssignment(
      data.assignedToId,
      task.title
    )

    req.app
      .get("io")
      .to(data.assignedToId)
      .emit("notification:new", notification)
  }

  req.app.get("io").emit("task:updated", task)
  res.json(task)
}
