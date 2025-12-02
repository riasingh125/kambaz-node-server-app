import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  app.post("/api/courses/:cid/assignments", async (req, res) => {
    try {
      const newAssignment = await dao.createAssignment({
        ...req.body,
        course: req.params.cid,
      });
      res.json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    try {
      const assignments = await dao.findAssignmentsForCourse(req.params.cid);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/assignments/:aid", async (req, res) => {
    try {
      const assignment = await dao.findAssignmentById(req.params.aid);
      if (!assignment) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      }
      res.json(assignment);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });


  app.put("/api/assignments/:aid", async (req, res) => {
    try {
      const updated = await dao.updateAssignment(req.params.aid, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });


  app.delete("/api/assignments/:aid", async (req, res) => {
    try {
      const result = await dao.deleteAssignment(req.params.aid);
      res.json(result);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });
}