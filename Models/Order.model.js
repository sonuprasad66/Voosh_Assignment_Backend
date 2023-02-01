const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: String, require: true },
    sub_total: { type: String, require: true },
    phone_number: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const orderModel = new mongoose.model("order", orderSchema);

module.exports = {
  orderModel,
};
