import { Router } from "express";
import { connection } from "../database/database.js";
const user_registration = Router();


user_registration.get("/yoink_advising_id", (req, res) => {
  connection.execute("SELECT MAX(advising_id) AS advisingID FROM records", function (err, result) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        status: 200,
        message: "Response from yoink_advising_id get api",
        data: result,
      });
    }
  });
});

  





// Get registration information prerequisites based on a given user's email
// Currently not working as intended
// TODO: Fix this shit
// user_registration.get("/:email", (req, res) => {
//   connection.execute (
//     "\
//       SELECT \
//         a.user_id,\
//         b.advising_id,\
//         b.last_term,\
//         b.last_gpa,\
//         b.current_term,\
//         b.status,\
//         b.date_submitted,\
//         GROUP_CONCAT(d.course_id) AS course_ids,\
//         GROUP_CONCAT(d.course_name,\" - \", d.course_tag) AS courses,\
//         GROUP_CONCAT(f.prereq_id) AS prereq_ids,\
//         GROUP_CONCAT(f.prereq_tag,\" - \",f.prereq_name)\
//       FROM \
//         user_information AS a\
//         INNER JOIN records AS b ON a.user_id\
//         INNER JOIN course_mapping AS c ON b.advising_id\
//         INNER JOIN course AS d ON c.course_id\
//         INNER JOIN prereq_mapping AS e ON b.advising_id\
//         INNER JOIN prerequisites AS f ON e.prereq_id\
//       WHERE \
//         a.Email=?\
//         AND a.user_id = b.user_id\
//         AND c.advising_id = b.advising_id\
//         AND d.course_id = c.course_id\
//         AND e.advising_id = b.advising_id\
//         AND f.prereq_id = e.prereq_id\
//       GROUP BY \
//         b.advising_id",
//     [req.params.email],
//     function (err, result) {
//       if (err) { 
//         res.json(err.message);
//       } else {
//         res.json({
//           data: result,
//         }); 
//       }
//     } 
//   );
// });






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
  connection.execute (
   "Insert into records (user_id, last_term, last_gpa, current_term, status, date_submitted) values(?,?,?,?,?,?)",
    [
      req.body.userID,
      req.body.last_term,
      req.body.last_gpa,
      req.body.currentTerm,
      req.body.status,
      req.body.date_submitted
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






user_registration.get("/yoink_advising_id", (req, res) => {
  connection.execute("SELECT MAX(advising_id) AS advisingID FROM records", function (err, result) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        status: 200,
        message: "Response from yoink_advising_id get api",
        data: result,
      });
    }
  });
});


























export default user_registration;
