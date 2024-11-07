import { Router } from "express";
import { connection } from "../database/database.js";
const prerequisites = Router();


prerequisites.get("/", (req, res) => {
  connection.execute("select prereq_id, prereq_level, prereq_tag, prereq_name, credit_hours, enable_disable from prerequisites WHERE prereq_id <> 1", 
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


prerequisites.get("/prereqAdvisingPortalRequest", (req, res) => {
  connection.execute("SELECT CONCAT(prereq_tag,\" - \", prereq_name) AS prereqName FROM prerequisites WHERE enable_disable = '1'", 
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


prerequisites.post("/togglePrerequisites", (req, res) => {
  if (req.body.toggleVal === true)
  {
    connection.execute("UPDATE prerequisites SET enable_disable='1' WHERE prereq_id=?",
      [req.body.preReq_ID],
      function(err, result) { 
        if (err) {
          res.json({ 
            status:400,
            message: "Failed to set 'enable_disable' to 'true'",
          });
        } else {
          res.json({
            status:200,
            message: "Successfully set 'enable_disable' to 'true'",
            data: result, 
          }); 
        } 
      } 
    );
  } else if (req.body.toggleVal === false) {
    connection.execute("UPDATE prerequisites SET enable_disable='0' WHERE prereq_id=?",
      [req.body.preReq_ID],
      function(err, result) { 
        if (err) {
          res.json({ 
            status:400,
            message: "Failed to set 'enable_disable' to 'false'",
          });
        } else {
          res.json({
            status:200,
            message: "Successfully set 'enable_disable' to 'false'",
            data: result, 
          }); 
        } 
      } 
    );
  }
});








  
export default prerequisites;
