import { Schema, model } from "mongoose"

const taskSchema = new Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  status: String,
  creatorId: Schema.Types.ObjectId,
  assignedToId: Schema.Types.ObjectId
}, { timestamps: true })

export default model("Task", taskSchema)
