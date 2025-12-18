import { z } from "zod"

export const createTaskDto = z.object({
  title: z.string().max(100),
  description: z.string(),
  dueDate: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  status: z.enum(["To Do", "In Progress", "Review", "Completed"]),
  assignedToId: z.string()
})

export const updateTaskDto = createTaskDto.partial()
