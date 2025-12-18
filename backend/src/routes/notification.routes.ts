import { Router } from "express"
import { auth } from "../middlewares/auth.middleware.js"
import { getNotifications, markRead } from "../controllers/notification.controller.js"

const router = Router()
router.get("/", auth, getNotifications)
router.patch("/:id", auth, markRead)

export default router
