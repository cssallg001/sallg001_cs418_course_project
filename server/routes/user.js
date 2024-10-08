import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
import { SendMail } from "../utils/SendMail.js";
const user = Router();



function generateTempPassword(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}







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


user.post("/forgot-password", (req, res) => {

  connection.execute("SELECT * FROM userdata WHERE email=?", 
    [req.body.email], 
    function (err, result) {
    if (err) {
      return res.status(500).json({ message: "Error retrieving user" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

    const tempPassword = generateTempPassword(12);
    const hashedTempPassword = HashedPassword(tempPassword);

    connection.execute(
      "UPDATE userdata SET Password=? WHERE email=?",
      [hashedTempPassword, req.body.email],
      (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ message : "Error updated password"});
        }

        SendMail(req.body.email, "Temporary Password", 'Your new temporary password is: ${tempPassword}');
        return res.status(200).json({ message: "Password reset link has been sent to your email"});
      });
  })
});









user.post("/change-password", (req, res) => {
  connection.execute(
    "select * from user_information where email=?",
    [req.body.email],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else if (result.length === 0) {
        // User not found
        res.json({
          status: 404,
          message: "User not found",
        });
      } else {
        const user = result[0];
        if (ComparePasword(req.body.currentPassword, user.Password)) {
          const newHashedPassword = HashedPassword(req.body.newPassword);
          connection.execute(
            "update user_information set Password=? where email=?",
            [newHashedPassword, req.body.email],
            function (err, result) {
              if (err) {
                res.json({
                  status: 500,
                  message: "Error: Failed to changed password",
                });
              } else {
                res.json({
                  status: 200,
                  message: "Password successfully changed",
                  data: result,
                });
              }
            }
          )
        }
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


user.post("/verifyIfEmailExists", (req, res) => {
  connection.execute(
    "select email from user_information where email=?",
    [req.body.email],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        console.log(result);
        if (result.length<=0) {
          res.json({
            status: 200,
            message: "Email is available",
            data: result,
          });
        } else {
          res.json("Email already in use");
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
      } else {
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
        } else {
          res.json({
            message: "Email already in use"
          });
        }
      }
    }
  );
});



export default user;
