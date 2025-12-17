import { registerService } from "../services/auth.service.js"

test("reject duplicate user", async () => {
  await registerService({ name: "A", email: "a@test.com", password: "123456" })
  await expect(registerService({ name: "A", email: "a@test.com", password: "123456" }))
    .rejects.toThrow()
})
