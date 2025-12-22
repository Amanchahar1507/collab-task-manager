import { useEffect, useState } from "react"
import { socket } from "../socket"
import type { Notification } from "../types/notification"

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
