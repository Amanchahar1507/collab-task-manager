import http from "http"
import { Server } from "socket.io"
import app from "./app.js"
import { connectDB } from "./config/db.js"

connectDB()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*", credentials: true } })

app.set("io", io)

io.on("connection", () => {})

server.listen(5000)
