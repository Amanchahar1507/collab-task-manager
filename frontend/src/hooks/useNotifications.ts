import { useEffect, useState } from "react"
import { socket } from "../socket"

export interface Notification {
  _id: string
  message: string
  createdAt: string
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    socket.on("notification:new", (notification: Notification) => {
      setNotifications(prev => [notification, ...prev])
    })

    return () => {
      socket.off("notification:new")
    }
  }, [])

  return notifications
}
