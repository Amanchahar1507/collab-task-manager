import { useState } from "react"
import { updateTask, deleteTask } from "../api/tasks"
import { useQueryClient } from "@tanstack/react-query"
import type { Task, TaskStatus } from "../types/task"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [status, setStatus] = useState<TaskStatus>(task.status)

  const save = async () => {
    await updateTask(task._id, { status })
    qc.invalidateQueries({ queryKey: ["dashboard"] })
    setEditing(false)
  }

  const remove = async () => {
    await deleteTask(task._id)
    qc.invalidateQueries({ queryKey: ["dashboard"] })
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm space-y-2">
      <div className="font-medium">{task.title}</div>
      <div className="text-sm text-gray-500">{task.description}</div>

      {editing ? (
        <select
          className="border p-1"
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>
      ) : (
        <div className="text-sm">{task.status}</div>
      )}

      <div className="flex gap-2">
        {editing ? (
          <button
            onClick={save}
            className="text-green-600 text-sm"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
        )}

        <button
          onClick={remove}
          className="text-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
