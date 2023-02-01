const { orderModel } = require("../Models/Order.model");

const addOrder = async (req, res) => {
  try {
    const { user_id, sub_total, phone_number } = req.body;
    const new_order = new orderModel({
      user_id: user_id,
      sub_total: sub_total,
      phone_number: phone_number,
    });
    await new_order.save();
    res.send({ message: "Order Added Successfull", status: "success" });
  } catch (err) {
    res.send(err);
  }
};

const getOrder = async (req, res) => {
  const { user_id } = req.body;
  const order = await orderModel.find({ user_id: user_id });
  res.send(order);
};

const updateOrder = async (req, res) => {
  const { id, data } = req.body;

  const updatedData = await orderModel.findByIdAndUpdate(
    { _id: id },
    { _id: id, ...data },
    { new: true }
  );
  res.send({ message: "Order updated successfully", status: "success" });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const users = await orderModel.deleteOne({ _id: id });
  res.send({
    users: users,
    message: "Order deleted successfully",
    status: "success",
  });
};

module.exports = {
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
