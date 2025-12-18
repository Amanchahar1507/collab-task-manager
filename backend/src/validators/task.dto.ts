import { z } from "zod";

export const createTaskDto = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  status: z.enum(["To Do", "In Progress", "Review", "Completed"]),
  assignedToId: z.string().optional(),
});

export const updateTaskDto = createTaskDto.partial();
