import Product from "../models/Product";
import User from "../models/User";

export const newProduct = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatedProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Product.findOneAndDelete(id);
    return res.status(200).json("Product has been successfully deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getAll = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: { $in: [qCategory] },
      });
    } else {
      products = await Product.find();
    }

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addWishlist = async (req, res) => {
  const userId = req.params.id;
  const { item } = req.body;
  console.log(item);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item is already in the wishlist
    if (user.wishlist.includes(item)) {
      return res
        .status(400)
        .json({ message: "Item is already in the wishlist" });
    }

    user.wishlist.push(item);
    await user.save();
    return res
      .status(200)
      .json({ message: "Item added to wishlist successfully", user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

export const removeWishlist = async (req, res) => {
  const userId = req.params.id;
  const { item } = req.body;
  console.log(item);
  // const id = item._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item is in the wishlist
    const itemIndex = user.wishlist.indexOf(item);
    // console.log(itemIndex);

    // Remove the item from the wishlist using splice
    user.wishlist.splice(itemIndex, 1);
    await user.save();
    return res
      .status(200)
      .json({ message: "Item removed from wishlist successfully", user, item });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

// export const addRemoveWishlist = async (req, res) => {
//   const userId = req.params.userId;
//   const { wishlisted, item } = req.body;
//   const product = item;
//   try {
//     //if(wishlisted){
//     //first find the user and add this product to user's wishlist array}
//     //else{find the user and remove this item from user's wishlist}
//   } catch (err) {
//     return res.status(500).json({ message: "Something went wrong", err });
//   }
// };
