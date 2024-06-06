const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = (req, res) => {
    const { name,
        email,
        password,
        role} = req.body;

        if (!name || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
    
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

    const user = new usersModel({name,
        email,
        password,
    //static    role
    });
  
    user
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `Account Created Successfully`,
          student: result,
        });
      })
      .catch((err) => {
        if (err.keyPattern) {
          return res.status(409).json({
            success: false,
            message: `The email already exists`,
          });
        }
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

  const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    usersModel
      .findOne({ email })
      .populate("role", "-_id -__v")
      .then(async (result) => {
        if (!result) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        try {
          const valid = await bcrypt.compare(password, result.password);
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The email doesn't exist or The password you’ve entered is incorrect`,
            });
          }
          const payload = {
            userId: result._id,
            student: result.name,
            role: result.role,
          };
  
          const token = jwt.sign(payload, process.env.SECRET);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
          });
        } catch (error) {
          throw new Error(error.message);
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };
  








  
module.exports = {
    register,
    login,
  };
  