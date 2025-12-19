import { Router } from "express"
import { auth } from "../middlewares/auth.middleware.js"
import { getProfile, updateProfile } from "../controllers/user.controller.js"

const router = Router()

router.get("/me", auth, getProfile)
router.patch("/me", auth, updateProfile)

export default router
