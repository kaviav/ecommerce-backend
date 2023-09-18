import Order from "../models/Order";

export const newOrder = async (req, res, next) => {
  const order = new Order(req.body);
  try {
    const savedOrder = await order.save();
    return res.status(200).json(savedOrder);
  } catch (err) {
    return console.log(err);
  }
};

export const updateOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);
    return res.status(200).json("Successfully deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await Order.findById(userId);
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all cart
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get monthly income
export const getIncome = async (req, res, next) => {
  const date = new Date(); //sep
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); //aug
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); //july

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    return res.status(200).json(income);
  } catch (err) {
    return res.status(500).json(err);
  }
};
