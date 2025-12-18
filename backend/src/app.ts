import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import taskRoutes from "./routes/task.routes.js"
import authRoutes from "./routes/auth.routes.js"
import notificationRoutes from "./routes/notification.routes.js"



const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())


app.use("/api/notifications", notificationRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

export default app
