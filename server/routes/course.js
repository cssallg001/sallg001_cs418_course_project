import { Router } from "express";
import { connection } from "../database/database.js";
const course = Router();

course.get("/", (req, res) => {
  connection.execute ("select * from course", function (err, result) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        data: result,
      });
    }
  });
});

course.get("/courseAdvisingPortalRequest", (req, res) => {
  connection.execute("SELECT course_id, CONCAT(course_tag,\" - \", course_name) AS courseName FROM course", 
    function (err, result) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        status: 200,
        message: "Response from prerequisites get api",
        data: result,
      });
    } 
  });
});

// Get course prerequisites based on a given course id
course.get("/:id", (req, res) => {
  connection.execute (
    "\
      SELECT \
        a.course_id, \
        a.course_tag, \
        a.credit_hours, \
        b.prereq_set_num, \
        GROUP_CONCAT(c.prereq_id) as prereq_ids, \
        GROUP_CONCAT(d.prereq_tag) as prereq_tags, \
        GROUP_CONCAT(d.credit_hours) AS prereq_credit_hours \
      FROM course AS a \
        INNER JOIN course_prereqs AS b ON a.course_id \
        INNER JOIN prerequisite_sets AS c ON b.prereq_set_num \
        INNER JOIN prerequisites AS d ON c.prereq_id \
      WHERE a.course_id=? \
        AND a.course_id = b.course_id \
        AND b.prereq_set_num = c.prereq_set_num \
        AND c.prereq_id = d.prereq_id \
      GROUP BY c.prereq_set_num",
    [req.params.id],
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

course.post("/", (req, res) => {
  connection.execute (
    "Insert into course (course_tag,course_name,credit_hours,prereq1,prereq2,prereq3,prereq4) values(?,?,?,?,?,?,?)",
    [req.body.course_tag, req.body.course_name, req.body.credit_hours, req.body.prereq1, req.body.prereq2, req.body.prereq3, req.body.prereq4],
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


  
export default course;
