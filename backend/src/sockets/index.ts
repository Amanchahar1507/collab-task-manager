import { Server } from "socket.io"

export const initSocket = (io: Server) => {
  io.on("connection", socket => {
    socket.on("task:update", data => {
      socket.broadcast.emit("task:updated", data)
    })
  })
}
