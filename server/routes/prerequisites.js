import { Router } from "express";
import { connection } from "../database/database.js";
const prerequisites = Router();

prerequisites.get("/", (req, res) => {
  connection.execute(
    "select prereq_id, prereq_level, prereq_tag, prereq_name, credit_hours, enable_disable from prerequisites WHERE prereq_id <> 1",
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
    },
  );
});

prerequisites.get("/prereqAdvisingPortalRequest/:id", (req, res) => {
  connection.execute(
    "\
    SELECT \
      d.prereq_id AS oututprereqID, \
      CONCAT(d.prereq_tag," - ", d.prereq_name) AS outputprereqName \
    FROM\
      prereq AS d\
    WHERE \
      NOT EXISTS \
      (\
        SELECT \
          c.prereq_id AS prereq_id, \
          CONCAT(c.prereq_tag," - ", c.prereq_name) AS prereqName\
        FROM \
          records AS a \
          INNER JOIN prereq_mapping AS b ON a.advising_id\
          INNER JOIN prerequisites AS c ON b.prereq_id\
        WHERE \
          a.user_id=? \
          AND \
          b.prereq_id = d.prereq_id\
      )\
      AND\
      d.enable_disable='1'\
      ", 
      [req.params.id],
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
    },
  );
});

prerequisites.post("/togglePrerequisites", (req, res) => {
  if (req.body.toggleVal === true) {
    connection.execute(
      "UPDATE prerequisites SET enable_disable='1' WHERE prereq_id=?",
      [req.body.preReq_ID],
      function (err, result) {
        if (err) {
          res.json({
            status: 400,
            message: "Failed to set 'enable_disable' to 'true'",
          });
        } else {
          res.json({
            status: 200,
            message: "Successfully set 'enable_disable' to 'true'",
            data: result,
          });
        }
      },
    );
  } else if (req.body.toggleVal === false) {
    connection.execute(
      "UPDATE prerequisites SET enable_disable='0' WHERE prereq_id=?",
      [req.body.preReq_ID],
      function (err, result) {
        if (err) {
          res.json({
            status: 400,
            message: "Failed to set 'enable_disable' to 'false'",
          });
        } else {
          res.json({
            status: 200,
            message: "Successfully set 'enable_disable' to 'false'",
            data: result,
          });
        }
      },
    );
  }
});

export default prerequisites;
