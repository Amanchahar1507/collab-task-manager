import { Schema, model } from "mongoose"

const notificationSchema = new Schema({
  userId: Schema.Types.ObjectId,
  message: String,
  read: { type: Boolean, default: false }
}, { timestamps: true })

export default model("Notification", notificationSchema)
