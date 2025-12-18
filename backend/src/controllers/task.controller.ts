import { Request, Response } from "express"
import * as service from "../services/task.service.js"
import { createTaskDto, updateTaskDto } from "../validators/task.dto.js"

export const createTask = async (req: any, res: Response) => {
  const data = createTaskDto.parse(req.body)
  const task = await service.createTaskService(data, req.userId)
  req.io.emit("task:created", task)
  res.status(201).json(task)
}

export const getDashboard = async (req: any, res: Response) => {
  const data = await service.getDashboardTasks(req.userId)
  res.json(data)
}

export const updateTask = async (req: Request, res: Response) => {
  const data = updateTaskDto.parse(req.body)
  const task = await service.updateTaskService(req.params.id, data)
  req.app.get("io").emit("task:updated", task)
  res.json(task)
}

export const deleteTask = async (req: Request, res: Response) => {
  await service.deleteTaskService(req.params.id)
  res.status(204).send()
}
