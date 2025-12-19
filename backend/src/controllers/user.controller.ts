import { Response } from "express"
import User from "../models/User.js"

export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.userId).select("name email")
  res.json(user)
}

export const updateProfile = async (req: any, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { name: req.body.name },
    { new: true }
  ).select("name email")

  res.json(user)
}
