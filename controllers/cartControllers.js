import Cart from "../models/Cart";

export const newCart = async (req, res, next) => {
  const cart = new Cart(req.body);
  try {
    cart = await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
  }
};

export const deleteCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Cart.findByIdAndDelete(id);
    return res.status(200).json("Successfully deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get user cart
export const getCart = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const cart = await Cart.findOne(userId);
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get all cart
export const getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json(err);
  }
};
