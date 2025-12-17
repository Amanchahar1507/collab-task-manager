import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const auth = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: "unauthorized" })

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    req.userId = decoded.id
    next()
  } catch {
    res.status(401).json({ message: "invalid token" })
  }
}
