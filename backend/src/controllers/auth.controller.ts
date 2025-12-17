import { Request, Response } from "express"
import * as service from "../services/auth.service.js"

export const register = async (req: Request, res: Response) => {
  const user = await service.registerService(req.body)
  res.status(201).json(user)
}

export const login = async (req: Request, res: Response) => {
  const { token, user } = await service.loginService(req.body)
  res.cookie("token", token, { httpOnly: true, sameSite: "lax" })
  res.json({ id: user._id, name: user.name, email: user.email })
}

export const logout = async (_: Request, res: Response) => {
  res.clearCookie("token")
  res.json({ message: "logged out" })
}
