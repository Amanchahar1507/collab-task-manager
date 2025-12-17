import { createTaskService } from "../services/task.service.js"

test("reject long title", async () => {
  await expect(createTaskService({ title: "a".repeat(101) }))
    .rejects.toThrow()
})
