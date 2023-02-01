const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../Models/User.model");

const userSignup = async (req, res) => {
  const { name, phone_number, password } = req.body;
  try {
    const user = await userModel.findOne({ name, phone_number });
    if (user) {
      res.send({
        message: "User already exists! Please Try to Login",
        status: "exist",
      });
    } else {
      bcrypt.hash(password, 5, async (err, hash_password) => {
        if (err) {
          res.send({ message: "Something went wrong", status: "failed" });
        } else {
          const new_user = new userModel({
            name: name,
            phone_number: phone_number,
            password: hash_password,
          });
          await new_user.save();
          res.send({ message: "Signup Successfull", status: "success" });
        }
      });
    }
  } catch (err) {
    res.send({ message: "Something went wrong", status: "error" });
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  const { phone_number, password } = req.body;
  const user = await userModel.findOne({ phone_number });

  if (user) {
    const hashed_password = user.password;
    const user_id = user._id;

    bcrypt.compare(password, hashed_password, async (err, result) => {
      if (err) {
        res.send({ message: "Something went wrong", status: "error" });
      } else {
        if (result) {
          let token = jwt.sign({ user_id }, process.env.SECRET_KEY);
          res.send({
            message: "Login successful",
            status: "success",
            token: token,
          });
        } else {
          res.send({ message: "Login failed", status: "failed" });
        }
      }
    });
  } else {
    res.send({ message: "Please Signup First", status: "failed" });
  }
};

const userProfile = async (req, res) => {
  const { user_id } = req.body;
  const currentUser = await userModel.findOne({ _id: user_id });
  res.send(currentUser);
};

module.exports = {
  userSignup,
  userLogin,
  userProfile,
};
