import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.post("/api/users/:uid/courses/:cid/enroll", async (req, res) => {
    const { uid, cid } = req.params;
    const enrollment = await dao.enrollUserInCourse(uid, cid);
    res.json(enrollment);
  });

  app.delete("/api/users/:uid/courses/:cid/unenroll", async (req, res) => {
    const { uid, cid } = req.params;
    const result = await dao.unenrollUserFromCourse(uid, cid);
    res.json(result);
  });

  app.get("/api/users/:uid/enrollments", async (req, res) => {
    const { uid } = req.params;
    const enrollments = await dao.findEnrollmentsByUser(uid);
    res.json(enrollments);
  });
}