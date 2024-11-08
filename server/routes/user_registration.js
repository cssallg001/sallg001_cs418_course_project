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

  
export default user_registration;
