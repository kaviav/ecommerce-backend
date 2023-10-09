import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken";
import {
  addWishlist,
  deleteProduct,
  getAll,
  getAllWishlist,
  getProduct,
  newProduct,
  removeWishlist,
  updatedProduct,
} from "../controllers/productControllers";

const productRouter = express.Router();

productRouter.post("/add", verifyTokenAndAdmin, newProduct);
productRouter.put("/update/:id", verifyTokenAndAdmin, updatedProduct);
productRouter.delete("/delete/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/getone/:id", getProduct);
productRouter.get("/getall", getAll);

productRouter.post("/wishlist/:id", addWishlist);
productRouter.delete("/wishlist/:id", removeWishlist);
productRouter.get("/wishlist/getall/:id", getAllWishlist);

export default productRouter;
