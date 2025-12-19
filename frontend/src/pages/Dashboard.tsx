import { useEffect, useMemo, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useDashboard } from "../hooks/useDashboard"
import { socket } from "../socket"
import Notifications from "../components/Notifications"

const statuses = ["All", "To Do", "In Progress", "Review", "Completed"]
const priorities = ["All", "Low", "Medium", "High", "Urgent"]

export default function Dashboard() {
  const qc = useQueryClient()
  const { data, isLoading } = useDashboard()

  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")
  const [sort, setSort] = useState("asc")

  const userId = data?.tasks?.[0]?.creatorId || ""

  useEffect(() => {
    socket.emit("join", userId)

    socket.on("task:created", () => qc.invalidateQueries({ queryKey: ["dashboard"] }))
    socket.on("task:updated", () => qc.invalidateQueries({ queryKey: ["dashboard"] }))

    return () => {
      socket.off("task:created")
      socket.off("task:updated")
    }
  }, [userId])

  const filteredTasks = useMemo(() => {
    if (!data?.tasks) return []

    let tasks = [...data.tasks]

    if (status !== "All") {
      tasks = tasks.filter(t => t.status === status)
    }

    if (priority !== "All") {
      tasks = tasks.filter(t => t.priority === priority)
    }

    tasks.sort((a, b) =>
      sort === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    )

    return tasks
  }, [data, status, priority, sort])

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-6 w-40 bg-gray-200 animate-pulse" />
        <div className="h-24 bg-gray-200 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Notifications userId={userId} />

      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          {statuses.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          {priorities.map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="asc">Due Date ↑</option>
          <option value="desc">Due Date ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Tasks</h2>

          {filteredTasks.length === 0 && (
            <div className="text-gray-400">No tasks found</div>
          )}

          {filteredTasks.map(task => (
            <div
              key={task._id}
              className="bg-white p-4 rounded shadow-sm flex justify-between"
            >
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500">
                  {task.status} • {task.priority}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-red-600">Overdue</h2>

          {data?.overdue.map(task => (
            <div
              key={task._id}
              className="bg-red-50 border border-red-200 p-4 rounded"
            >
              <div className="font-medium">{task.title}</div>
              <div className="text-sm text-red-600">
                Due {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
