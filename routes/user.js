import { Router } from "express";
import { connection } from "../database/database.js";
import { pool } from "../database/database.js";
const user = Router();

user.get("/user_information", (req, res) => {
  connection.execute("select * from user_information", function (err, result) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        status: 200,
        message: "Response from user get api",
        data: result,
      });
    }
  });
});

user.get('/pool', (req, res) => {

  pool.getConnection((err, connection) => {
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)

      connection.query('SELECT * from beers', (err, rows) => {
          connection.release()

          if (!err) {
              res.send(rows)
          } else {
              console.log(err)
          }
      })
  })
})

export default user;
