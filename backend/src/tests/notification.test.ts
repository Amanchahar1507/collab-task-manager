import { notifyAssignment } from "../services/notification.service.js"

test("creates assignment notification", async () => {
  const n = await notifyAssignment("123", "Test Task")
  expect(n.message).toContain("Test Task")
})
