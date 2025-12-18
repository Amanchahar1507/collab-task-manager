import "dotenv/config"; 

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";

await connectDB(); 

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", credentials: true },
});
io.on("connection", socket => {
  socket.on("join", userId => {
    socket.join(userId)
  })
})

app.set("io", io);

io.on("connection", () => {});

server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
