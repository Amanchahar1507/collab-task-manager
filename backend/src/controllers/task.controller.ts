import { Request, Response } from "express";
import * as service from "../services/task.service.js";
import { createTaskDto, updateTaskDto } from "../validators/task.dto.js";
import { notifyAssignment } from "../services/notification.service.js";

export const createTask = async (req: any, res: Response) => {
  const data = createTaskDto.parse(req.body);
  const task = await service.createTaskService(data, req.userId);

  req.app.get("io").emit("task:created", task);
  res.status(201).json(task);
};

export const getDashboard = async (req: any, res: Response) => {
  const data = await service.getDashboardTasks(req.userId);
  res.json(data);
};

export const deleteTask = async (req: Request, res: Response) => {
  await service.deleteTaskService(req.params.id);
  res.status(204).send();
};

export const updateTask = async (req: any, res: Response) => {
  const data = updateTaskDto.parse(req.body);
  const task = await service.updateTaskService(req.params.id, data);

  if (data.assignedToId) {
    const notification = await notifyAssignment(
      data.assignedToId,
      task.title
    );
    req.app
      .get("io")
      .to(data.assignedToId)
      .emit("notification:new", notification);
  }

  req.app.get("io").emit("task:updated", task);
  res.json(task);
};
