import { Request, Response } from "express"
import * as service from "../services/task.service.js"

export const createTask = async (req: Request, res: Response) => {
  const task = await service.createTaskService(req.body)
  res.status(201).json(task)
}
