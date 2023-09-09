import Product from "../models/Product";

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
