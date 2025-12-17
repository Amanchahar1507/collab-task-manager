import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import * as repo from "../repositories/user.repository.js"

export const registerService = async (data: any) => {
  const exists = await repo.findUserByEmail(data.email)
  if (exists) throw new Error("User exists")

  const hashed = await bcrypt.hash(data.password, 10)
  return repo.createUser({ ...data, password: hashed })
}

export const loginService = async (data: any) => {
  const user = await repo.findUserByEmail(data.email)
  if (!user) throw new Error("Invalid credentials")

  const match = await bcrypt.compare(data.password, user.password)
  if (!match) throw new Error("Invalid credentials")

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" })
  return { user, token }
}
