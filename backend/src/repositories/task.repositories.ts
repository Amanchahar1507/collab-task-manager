import Task from "../models/Task.js"

export const createTask = (data: any) => Task.create(data)

export const getUserTasks = (userId: string) =>
  Task.find({
    $or: [{ creatorId: userId }, { assignedToId: userId }]
  })

export const getOverdueTasks = () =>
  Task.find({ dueDate: { $lt: new Date() }, status: { $ne: "Completed" } })

export const updateTask = (id: string, data: any) =>
  Task.findByIdAndUpdate(id, data, { new: true })

export const deleteTask = (id: string) =>
  Task.findByIdAndDelete(id)
