import { createTaskService } from "../services/task.service.js";

test("creator id is attached", async () => {
  const task = await createTaskService(
    {
      title: "Test",
      description: "X",
      dueDate: new Date().toISOString(),
      priority: "Low",
      status: "To Do",
      assignedToId: "123",
    },
    "user123"
  );

  expect(task.creatorId.toString()).toBe("user123");
});
