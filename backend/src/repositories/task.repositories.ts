import Task from "../models/Task.js"

export const createTask = (data: any) => Task.create(data)
export const getTasks = () => Task.find()
export const updateTask = (id: string, data: any) => Task.findByIdAndUpdate(id, data, { new: true })
