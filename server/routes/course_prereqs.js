import { Router } from "express";
import { connection } from "../database/database.js";
const course_prereqs = Router();

course_prereqs.get("/", (req, res) => {
  connection.execute("select * from course_prereqs", function (err, result) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        status: 200,
        message: "Response from course_prereqs get api",
        data: result,
      });
    }
  });
});

export default course_prereqs;
