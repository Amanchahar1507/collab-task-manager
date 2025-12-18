import { Router } from "express"
import { auth } from "../middlewares/auth.middleware.js"
import {
  createTask,
  getDashboard,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js"

const router = Router()

router.post("/", auth, createTask)
router.get("/dashboard", auth, getDashboard)
router.patch("/:id", auth, updateTask)
router.delete("/:id", auth, deleteTask)

export default router
