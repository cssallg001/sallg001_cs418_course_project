import { Router } from "express";
import { connection } from "../database/database.js";
const prerequisite_sets = Router();


prerequisite_sets.get("/", (req, res) => {
  connection.execute("select * from prerequisite_sets", function (err, result) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        status: 200,
        message: "Response from prerequisite_sets get api",
        data: result,
      });
    }
  });
});

  
export default prerequisite_sets;
