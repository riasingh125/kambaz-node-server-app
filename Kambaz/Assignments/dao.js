import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao(db) {
  async function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
  }

  function createAssignment(assignment) {
    const newAssignment = { 
      ...assignment, 
      _id: uuidv4(),
      points: assignment.points || 100,
      dueDate: assignment.dueDate || "TBA",
      availableDate: assignment.availableDate || "TBA",
      availableUntil: assignment.availableUntil || "TBA"
    };
    return model.create(newAssignment);
  }

  function updateAssignment(assignmentId, updates) {
    return model.updateOne(
      { _id: assignmentId }, 
      { $set: updates }
    );
  }

  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}