import { Router } from "express";
import { connection } from "../database/database.js";
const user_registration = Router();

user_registration.get("/yoink_advising_id", (req, res) => {
  connection.execute(
    "SELECT MAX(advising_id) AS advisingID FROM records",
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          status: 200,
          message: "Response from yoink_advising_id get api",
          data: result,
        });
      }
    }
  );
});

// Get registration information prerequisites based on a given user's email
// Currently not working as intended
// TODO: Fix this shit
user_registration.get("/advisingHistory/:user_id", (req, res) => {
  connection.execute(
    "\
      SELECT \
        b.user_id,\
        b.advising_id,\
        b.last_term,\
        b.last_gpa,\
        b.current_term,\
        b.status,\
        b.date_submitted\
      FROM \
        records AS b\
      WHERE \
        b.user_id=?\
      GROUP BY \
        b.advising_id",
    [req.params.user_id],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          data: result,
        });
      }
    }
  );
});

user_registration.get("/advisingHistory/courses/:advising_id", (req, res) => {
  connection.execute(
    '\
    SELECT \
        a.advising_id AS advising_id, \
        a.course_id AS course_id,\
        CONCAT(b.course_tag," - ", b.course_name) AS courseName\
      FROM \
        course_mapping as a \
        INNER JOIN course AS b on a.course_id \
      WHERE \
        a.advising_id=? \
        AND a.course_id = b.course_id',
    [req.params.advising_id],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          data: result,
        });
      }
    }
  );
});

user_registration.get("/advisingHistory/prereqs/:advising_id", (req, res) => {
  connection.execute(
    '\
  SELECT \
      a.advising_id AS advising_id, \
      a.prereq_id AS prereq_id,\
      CONCAT(b.prereq_tag," - ", b.prereq_name) AS prereqName\
    FROM \
      prereq_mapping as a \
      INNER JOIN prerequisites AS b on a.prereq_id \
    WHERE \
      a.advising_id=? \
      AND a.prereq_id = b.prereq_id',
    [req.params.advising_id],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          data: result,
        });
      }
    }
  );
});

user_registration.delete("/:id", (req, res) => {
  connection.execute(
    "delete from records where advising_id=?",
    [req.params.id],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          status: 200,
          message: "Response from user delete api",
          data: result,
        });
      }
    }
  );
});

user_registration.post("/updateRecords", (req, res) => {
  connection.execute(
    "Insert into records (user_id, last_term, last_gpa, current_term, status, date_submitted) values(?,?,?,?,?,?)",
    [
      req.body.userID,
      req.body.last_term,
      req.body.last_gpa,
      req.body.currentTerm,
      req.body.status,
      req.body.date_submitted,
    ],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          data: result,
        });
      }
    }
  );
});

user_registration.post("/updateCourseMapping", (req, res) => {
  connection.execute(
    "Insert into course_mapping (advising_id, course_id) values(?,?)",
    [req.body.advising_id, req.body.course_id],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          data: result,
        });
      }
    }
  );
});

user_registration.post("/updatePrereqMapping", (req, res) => {
  connection.execute(
    "Insert into prereq_mapping (advising_id, prereq_id) values(?,?)",
    [req.body.advising_id, req.body.prereq_id],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          data: result,
        });
      }
    }
  );
});

user_registration.get("/yoink_advising_id", (req, res) => {
  connection.execute(
    "SELECT MAX(advising_id) AS advisingID FROM records",
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          status: 200,
          message: "Response from yoink_advising_id get api",
          data: result,
        });
      }
    }
  );
});

export default user_registration;
