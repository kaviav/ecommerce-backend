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
    const order = await Order.findById(userId);
    console.log(order);
    return res.status(200).json(order);
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
  const productId = req.query.pid;

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Here's what this part of the aggregation pipeline is doing:

// $match Stage: The $match stage is used to filter documents in the "Order" collection based on specified criteria.

// Filtering by Date: { createdAt: { $gte: previousMonth } }

// It filters documents where the "createdAt" field is greater than or equal to the "previousMonth." This means it selects documents with a creation date that falls within the timeframe of the previous month or later.
// Conditional Filter: { ...(productId && { products: { $elemMatch: { productId } } }), }

// This part is a conditional filter that checks if the productId variable is truthy (i.e., it has a value). If productId has a value, it applies an additional filter to match documents that contain a product with the specified productId in the "products" array field.

// { products: { $elemMatch: { productId } } } is a query condition using the $elemMatch operator. It matches documents where at least one element in the "products" array has a "productId" equal to the specified value.

// The usage of the spread operator (...) is used to conditionally include this filter only when productId has a value. If productId is falsy (e.g., null or undefined), this part of the filter will not be included in the $match stage.

// In summary, this $match stage filters documents in the "Order" collection based on two conditions:

// Documents with a "createdAt" date greater than or equal to the "previousMonth."
// Documents where the "products" array contains at least one element with a "productId" equal to the specified value (only if productId is provided).
// This allows the aggregation pipeline to retrieve specific orders based on date and, optionally, a specific product ID.

// $project Stage: The $project stage is used to reshape the documents by specifying which fields to include or exclude and creating new fields.

// Field Reshaping:

// month: { $month: "$createdAt" }: This line creates a new field called "month" and extracts the month component from the "createdAt" field using the $month operator. It converts the date into the month number (e.g., January becomes 1).

// sales: "$amount": This line creates a new field called "sales" and assigns the value of the "amount" field from the original document to it.

// So, at this stage, each document in the aggregation pipeline is transformed to have two new fields: "month" and "sales."

// javascript
// Copy code
// {
//   $group: {
//     _id: "$month",
//     total: { $sum: "$sales" },
//   },
// },
// $group Stage: The $group stage is used to group documents together based on a specified key or keys.

// Grouping by Month:

// _id: "$month": This line groups documents based on the "month" field created in the previous $project stage. It essentially groups orders by their respective months.

// total: { $sum: "$sales" }: This line calculates the total sales for each group of documents (each month) using the $sum operator. It sums up the "sales" values of all the documents in the same group, resulting in the total sales for that month.

// After this stage, you'll have a set of documents where each document represents a month, and it includes the "_id" (the month) and the "total" sales for that month.

// In summary, this part of the aggregation pipeline reshapes the documents to include the month and sales fields and then groups the documents by month while calculating the total sales for each month. The final output will be an array of objects, each representing a month and its total sales.
