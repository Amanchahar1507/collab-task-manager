import { Schema, model, Types } from "mongoose";

export interface TaskDocument {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: string;
  status: string;
  creatorId: Types.ObjectId; 
  assignedToId?: Types.ObjectId;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    priority: { type: String, required: true },
    status: { type: String, required: true },
    creatorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assignedToId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export const TaskModel = model<TaskDocument>("Task", taskSchema);
