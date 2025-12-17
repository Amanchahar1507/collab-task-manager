import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import taskRoutes from "./routes/task.routes.js"

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use("/api/tasks", taskRoutes)

export default app
