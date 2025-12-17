import http from "http"
import { Server } from "socket.io"
import app from "./app.js"
import { connectDB } from "./config/db.js"
import { initSocket } from "./sockets/index.js"

connectDB()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })
initSocket(io)

server.listen(5000)
