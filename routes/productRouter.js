import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken";
import {
  deleteProduct,
  getAll,
  getProduct,
  newProduct,
  updatedProduct,
} from "../controllers/productControllers";

const productRouter = express.Router();

productRouter.post("/add", verifyTokenAndAdmin, newProduct);
productRouter.put("/update/:id", verifyTokenAndAdmin, updatedProduct);
productRouter.delete("/delete/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/getone/:id", getProduct);
productRouter.get("/getall", getAll);

export default productRouter;
