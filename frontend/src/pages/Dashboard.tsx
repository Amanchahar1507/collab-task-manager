import { useEffect, useMemo, useState } from "react"
import { useDashboard } from "../hooks/useDashboard"
import { socket } from "../socket"
import { useQueryClient } from "@tanstack/react-query"

const statuses = ["All", "To Do", "In Progress", "Review", "Completed"]
const priorities = ["All", "Low", "Medium", "High", "Urgent"]

export default function Dashboard() {
  const qc = useQueryClient()
  const { data, isLoading } = useDashboard()

  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")
  const [sort, setSort] = useState("asc")

  useEffect(() => {
    socket.on("task:updated", () =>
      qc.invalidateQueries({ queryKey: ["dashboard"] })
    )
    return () => {
      socket.off("task:updated")
    }
  }, [])

  const createdTasks = useMemo(() => {
    if (!data?.created) return []

    let list = [...data.created]

    if (status !== "All") {
      list = list.filter(t => t.status === status)
    }

    if (priority !== "All") {
      list = list.filter(t => t.priority === priority)
    }

    list.sort((a, b) =>
      sort === "asc"
        ? new Date(a.dueDate ?? 0).getTime() -
          new Date(b.dueDate ?? 0).getTime()
        : new Date(b.dueDate ?? 0).getTime() -
          new Date(a.dueDate ?? 0).getTime()
    )

    return list
  }, [data, status, priority, sort])

  const assignedTasks = useMemo(() => {
    if (!data?.assigned) return []

    let list = [...data.assigned]

    if (status !== "All") {
      list = list.filter(t => t.status === status)
    }

    if (priority !== "All") {
      list = list.filter(t => t.priority === priority)
    }

    list.sort((a, b) =>
      sort === "asc"
        ? new Date(a.dueDate ?? 0).getTime() -
          new Date(b.dueDate ?? 0).getTime()
        : new Date(b.dueDate ?? 0).getTime() -
          new Date(a.dueDate ?? 0).getTime()
    )

    return list
  }, [data, status, priority, sort])

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex gap-4">
        <select className="border p-2" onChange={e => setStatus(e.target.value)}>
          {statuses.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select className="border p-2" onChange={e => setPriority(e.target.value)}>
          {priorities.map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select className="border p-2" onChange={e => setSort(e.target.value)}>
          <option value="asc">Due Date ↑</option>
          <option value="desc">Due Date ↓</option>
        </select>
      </div>

      <section>
        <h2 className="text-lg font-medium mb-2">Tasks Created By Me</h2>
        {createdTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded mb-2">
            <div>{task.title}</div>
            <div className="text-sm text-gray-500">{task.status}</div>
            <div className="text-sm text-gray-400">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "-"}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">Tasks Assigned To Me</h2>
        {assignedTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded mb-2">
            <div>{task.title}</div>
            <div className="text-sm text-gray-500">{task.status}</div>
            <div className="text-sm text-gray-400">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "-"}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-medium text-red-600 mb-2">Overdue Tasks</h2>
        {data?.overdue.map(task => (
          <div key={task._id} className="bg-red-50 p-4 rounded mb-2">
            <div>{task.title}</div>
            <div className="text-sm text-red-600">
              {task.dueDate
                ? `Due ${new Date(task.dueDate).toLocaleDateString()}`
                : "No due date"}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
