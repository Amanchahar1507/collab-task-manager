import * as repo from "../repositories/task.repositories.js"

export const createTaskService = async (data: any, userId: string) => {
  return repo.createTask({
    ...data,
    creatorId: userId
  })
}

export const getDashboardTasks = async (userId: string) => {
  const tasks = await repo.getUserTasks(userId)
  const overdue = await repo.getOverdueTasks()
  return { tasks, overdue }
}

export const updateTaskService = async (id: string, data: any) => {
  return repo.updateTask(id, data)
}

export const deleteTaskService = async (id: string) => {
  return repo.deleteTask(id)
}
