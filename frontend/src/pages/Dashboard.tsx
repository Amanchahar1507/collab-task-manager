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
    socket.connect()

    socket.on("task:updated", () =>
      qc.invalidateQueries({ queryKey: ["dashboard"] })
    )

    return () => {
      socket.disconnect()
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

  const applyFilters = (tasks: Task[]) => {
    let list = [...tasks]

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
  }

  const createdTasks = useMemo<Task[]>(
    () => (data?.created ? applyFilters(data.created) : []),
    [data, status, priority, sort]
  )

  const assignedTasks = useMemo<Task[]>(
    () => (data?.assigned ? applyFilters(data.assigned) : []),
    [data, status, priority, sort]
  )

  if (isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={() => (window.location.href = "/profile")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Profile
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-2">Notifications</h2>

        {notifications.length === 0 && (
          <div className="text-sm text-gray-500">No notifications</div>
        )}

        {notifications.map(n => (
          <div key={n._id} className="text-sm border-b py-1">
            {n.message}
          </div>
        ))}
      </section>

      {/* CREATE TASK */}
      <section className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-medium">Create Task</h2>

        <input
          className="border p-2 w-full"
          placeholder="Title"
          maxLength={100}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={taskPriority}
          onChange={e => setTaskPriority(e.target.value as TaskPriority)}
        >
          {priorityOptions.slice(1).map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={taskStatus}
          onChange={e => setTaskStatus(e.target.value as TaskStatus)}
        >
          {statusOptions.slice(1).map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={submitTask}
          disabled={creating}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {creating ? "Creating..." : "Create Task"}
        </button>
      </section>

      {/* FILTERS */}
      <div className="flex gap-4">
        <select
          className="border p-2"
          value={status}
          onChange={e => setStatus(e.target.value as "All" | TaskStatus)}
        >
          {statusOptions.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          className="border p-2"
          value={priority}
          onChange={e => setPriority(e.target.value as "All" | TaskPriority)}
        >
          {priorityOptions.map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          className="border p-2"
          value={sort}
          onChange={e => setSort(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Due Date ↑</option>
          <option value="desc">Due Date ↓</option>
        </select>
      </div>

      {/* CREATED TASKS */}
      <section>
        <h2 className="text-lg font-medium mb-2">Tasks Created By Me</h2>

        {createdTasks.length === 0 && (
          <div className="text-sm text-gray-500">No tasks created</div>
        )}

        {createdTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded mb-2 shadow-sm">
            <div className="font-medium">{task.title}</div>

            <select
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
      </section>

      {/* ASSIGNED TASKS */}
      <section>
        <h2 className="text-lg font-medium mb-2">Tasks Assigned To Me</h2>

        {assignedTasks.length === 0 && (
          <div className="text-sm text-gray-500">No assigned tasks</div>
        )}

        {assignedTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded mb-2 shadow-sm">
            <div className="font-medium">{task.title}</div>
            <div className="text-sm text-gray-500">{task.status}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
