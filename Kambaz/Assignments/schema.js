import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    dueDate: String,
    availableDate: String,
    availableUntil: String,
    points: Number,
    course: { type: String, ref: "CourseModel" }
  },
  { collection: "assignments" }
);

export default assignmentSchema;