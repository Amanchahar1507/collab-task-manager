import * as repo from "../repositories/task.repositories.js"

export const createTaskService = async (data: any) => {
  if (data.title.length > 100) throw new Error("Invalid title")
  return repo.createTask(data)
}
