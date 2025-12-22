import "dotenv/config"
import http from "http"
import { Server } from "socket.io"
import app from "./app.js"
import { connectDB } from "./config/db.js"

connectDB()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})

app.set("io", io)

io.on("connection", socket => {
  socket.on("join", userId => {
    socket.join(userId)
  })
})

server.listen(5000, () => {
  console.log("Server running on port 5000")
})
