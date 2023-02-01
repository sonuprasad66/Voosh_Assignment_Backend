const express = require("express");
const userRouter = express.Router();
const {
  userSignup,
  userLogin,
  userProfile,
} = require("../Controllers/User.controller");
const { authentication } = require("../Middlewares/authenticate");

userRouter.post("/add-user", userSignup);
userRouter.post("/login-user", userLogin);
userRouter.get("/profile", authentication, userProfile);

module.exports = {
  userRouter,
};
