import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { createTask } from "../api/tasks"
import type {
  TaskPriority,
  TaskStatus,
  CreateTaskPayload
} from "../types/task"

export default function CreateTask() {
  const qc = useQueryClient()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState<TaskPriority>("Low")
  const [status, setStatus] = useState<TaskStatus>("To Do")
  const [assignedToId, setAssignedToId] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const payload: CreateTaskPayload = {
      title,
      description,
      dueDate: dueDate || undefined,
      priority,
      status,
      assignedToId
    }

    setLoading(true)
    await createTask(payload)
    setLoading(false)

    setTitle("")
    setDescription("")
    setDueDate("")
    setAssignedToId("")

    qc.invalidateQueries({ queryKey: ["dashboard"] })
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="font-medium">Create Task</h2>

      <input
        className="border p-2 w-full"
        placeholder="Title (max 100 chars)"
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
        value={priority}
        onChange={e => setPriority(e.target.value as TaskPriority)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>

      <select
        className="border p-2 w-full"
        value={status}
        onChange={e => setStatus(e.target.value as TaskStatus)}
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Review</option>
        <option>Completed</option>
      </select>

      <input
        className="border p-2 w-full"
        placeholder="Assign To (User ID)"
        value={assignedToId}
        onChange={e => setAssignedToId(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </div>
  )
}
