import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
import { SendMail } from "../utils/SendMail.js";
const user = Router();

user.get("/", (req, res) => {
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

user.get("/:id", (req, res) => {
  connection.execute(
    "select * from user_information where user_id=?",
    [req.params.id],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          status: 200,
          message: "Response from user get api",
          data: result,
        });
      }
    }
  );
});

user.post("/", (req, res) => {

  const hashedPassword = HashedPassword(req.body.password)

  connection.execute(
    "Insert into user_information (First_Name,Last_Name,Email,Password) values(?,?,?,?)",
    [req.body.firstName, req.body.lastName, req.body.email, hashedPassword],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          status: 200,
          message: "Response from user post api",
          data: result,
        });
      }
    }
  );
});


user.delete("/:id", (req, res) => {
  connection.execute(
    "delete from user_information where user_id=?",
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


user.put("/:id", (req, res) => {
  connection.execute(
    "update user_information set First_Name=? , Last_Name=? where user_id=?",
    [req.body.firstName,
    req.body.lastName,
    req.params.id],
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


user.post("/login", (req, res) => {
  connection.execute(
    "select * from user_information where email=?",
    [req.body.email],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else if (result.length === 0) {
        res.json("Invalid Password"); 
      } else {
        console.log(result[0].Password);
        if (ComparePasword(req.body.Password, result[0].Password)) {

          SendMail(req.body.email,"Login Verification","Your login verification code is 1234567")

          res.json({
            status: 200,
            message: "user logged in successfully",
            data: result,
          });
        }
        else {
          res.json("Invalid Password");
        }

      }
    }
  );
});

user.post("/register", (req, res) => {
  const hashedPassword = HashedPassword(req.body.password)
  
  connection.execute(
    "select email from user_information where email=?",
    [req.body.email],
    function (err, result) {
      if (err) {
        res.json(err.message);
      }
      else {
        console.log(result);
        //console.log("Result[0] = " + result[0].password);
        if (result.length<=0) {
          connection.execute(
            "Insert into user_information (First_Name,Last_Name,Email,Password) values(?,?,?,?)",
            [req.body.firstName, req.body.lastName, req.body.email, hashedPassword],
            function (err, result) {
              if (err) {
                res.json(err.message);
              } else {
                SendMail(req.body.email,"Registration Verification","Your registration verification code is 1234567");
                res.json({
                  status: 200,
                  message: "Account successfully registered",
                  data: result,
                });
              }
            } 
          )

        }
        else {
          res.json({
            message: "Email already in use"
          });
        }
      }
    }
  );
});



export default user;
