import { Router } from "express";
import { connection } from "../database/database.js";
const prerequisites = Router();


prerequisites.get("/", (req, res) => {
  connection.execute("select * from prerequisites", function (err, result) {
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

  
export default prerequisites;
