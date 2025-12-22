import type { Notification } from "../types/notification"

interface Props {
  notifications: Notification[]
}

export default function Notifications({ notifications }: Props) {
  if (notifications.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No notifications
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {notifications.map((n: Notification) => (
        <div
          key={n._id}
          className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-sm p-2 rounded"
        >
          {n.message}
        </div>
      ))}
    </div>
  )
}
