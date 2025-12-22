import { useEffect, useMemo, useState } from "react"
import { useDashboard } from "../hooks/useDashboard"
import { useNotifications } from "../hooks/useNotifications"
import { socket } from "../socket"
import { useQueryClient } from "@tanstack/react-query"
import { createTask, updateTask, deleteTask } from "../api/tasks"
import type {
  Task,
  TaskPriority,
  TaskStatus,
  CreateTaskPayload
} from "../types/task"

const statusOptions: ("All" | TaskStatus)[] = [
  "All",
  "To Do",
  "In Progress",
  "Review",
  "Completed"
]

const priorityOptions: ("All" | TaskPriority)[] = [
  "All",
  "Low",
  "Medium",
  "High",
  "Urgent"
]

export default function Dashboard() {
  const qc = useQueryClient()
  const { data, isLoading } = useDashboard()
  const notifications = useNotifications()

  const [status, setStatus] = useState<"All" | TaskStatus>("All")
  const [priority, setPriority] = useState<"All" | TaskPriority>("All")
  const [sort, setSort] = useState<"asc" | "desc">("asc")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("Low")
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("To Do")
  const [assignedToId, setAssignedToId] = useState("")
  const [creating, setCreating] = useState(false)

  useEffect(() => {
  socket.on("task:updated", () =>
    qc.invalidateQueries({ queryKey: ["dashboard"] })
  )

  return () => {
    socket.off("task:updated")
  }
}, [])


  const submitTask = async () => {
    const payload: CreateTaskPayload = {
      title,
      description,
      dueDate: dueDate || undefined,
      priority: taskPriority,
      status: taskStatus,
      assignedToId
    }

    setCreating(true)
    await createTask(payload)
    setCreating(false)

    setTitle("")
    setDescription("")
    setDueDate("")
    setAssignedToId("")

    qc.invalidateQueries({ queryKey: ["dashboard"] })
  }

  const createdTasks = useMemo<Task[]>(() => {
    if (!data?.created) return []

    let list = [...data.created]

    if (status !== "All") list = list.filter(t => t.status === status)
    if (priority !== "All") list = list.filter(t => t.priority === priority)

    list.sort((a, b) =>
      sort === "asc"
        ? new Date(a.dueDate ?? 0).getTime() -
          new Date(b.dueDate ?? 0).getTime()
        : new Date(b.dueDate ?? 0).getTime() -
          new Date(a.dueDate ?? 0).getTime()
    )

    return list
  }, [data, status, priority, sort])

  const assignedTasks = useMemo<Task[]>(() => {
    if (!data?.assigned) return []

    let list = [...data.assigned]

    if (status !== "All") list = list.filter(t => t.status === status)
    if (priority !== "All") list = list.filter(t => t.priority === priority)

    list.sort((a, b) =>
      sort === "asc"
        ? new Date(a.dueDate ?? 0).getTime() -
          new Date(b.dueDate ?? 0).getTime()
        : new Date(b.dueDate ?? 0).getTime() -
          new Date(a.dueDate ?? 0).getTime()
    )

    return list
  }, [data, status, priority, sort])

  if (isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Task Manager</h1>
        <button
          onClick={() => (window.location.href = "/profile")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Profile
        </button>
      </header>

      <main className="p-6 space-y-8 max-w-7xl mx-auto">
        
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Notifications</h2>
          {notifications.length === 0 && (
            <p className="text-sm text-gray-500">No notifications</p>
          )}
          {notifications.map(n => (
            <div key={n._id} className="text-sm border-b py-2">
              {n.message}
            </div>
          ))}
        </section>


        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">Create Task</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border rounded-lg px-4 py-3"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type="datetime-local"
              className="border rounded-lg px-4 py-3"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />

            <textarea
              className="border rounded-lg px-4 py-3 md:col-span-2"
              placeholder="Description"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <select
              className="border rounded-lg px-4 py-3"
              value={taskPriority}
              onChange={e => setTaskPriority(e.target.value as TaskPriority)}
            >
              {priorityOptions.slice(1).map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <select
              className="border rounded-lg px-4 py-3"
              value={taskStatus}
              onChange={e => setTaskStatus(e.target.value as TaskStatus)}
            >
              {statusOptions.slice(1).map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            onClick={submitTask}
            disabled={creating}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            {creating ? "Creating..." : "Create Task"}
          </button>
        </section>

    
        <div className="flex gap-4">
          <select
            className="border p-2 rounded"
            value={status}
            onChange={e => setStatus(e.target.value as "All" | TaskStatus)}
          >
            {statusOptions.map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={priority}
            onChange={e => setPriority(e.target.value as "All" | TaskPriority)}
          >
            {priorityOptions.map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={sort}
            onChange={e => setSort(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Due Date ↑</option>
            <option value="desc">Due Date ↓</option>
          </select>
        </div>

        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Tasks Created By Me</h2>
            {createdTasks.map(task => (
              <div key={task._id} className="bg-white rounded-xl shadow p-4 mb-3">
                <div className="font-medium">{task.title}</div>

                <select
                  className="border mt-2 p-1 rounded"
                  value={task.status}
                  onChange={e =>
                    updateTask(task._id, {
                      status: e.target.value as TaskStatus
                    }).then(() =>
                      qc.invalidateQueries({ queryKey: ["dashboard"] })
                    )
                  }
                >
                  {statusOptions.slice(1).map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                      .then(() =>
                        qc.invalidateQueries({ queryKey: ["dashboard"] })
                      )
                      .catch(() => alert("Failed to delete task"))
                  }
                  className="text-red-600 text-sm ml-4"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Tasks Assigned To Me</h2>
            {assignedTasks.map(task => (
              <div key={task._id} className="bg-white rounded-xl shadow p-4 mb-3">
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500">{task.status}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
