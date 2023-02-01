const express = require("express");
const orderRouter = express.Router();
const {
  addOrder,
  getOrder,
  deleteOrder,
  updateOrder,
} = require("../Controllers/Order.controller");
const { authentication } = require("../Middlewares/authenticate");

orderRouter.post("/add-order", authentication, addOrder);
orderRouter.get("/get-order", authentication, getOrder);
orderRouter.patch("/update-order", updateOrder);
orderRouter.delete("/delete-order/:id", deleteOrder);

module.exports = {
  orderRouter,
};
