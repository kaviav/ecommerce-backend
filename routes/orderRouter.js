import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken";
import {
  deleteOrder,
  getAllOrders,
  getIncome,
  getUserOrders,
  getlatestUserOrder,
  newOrder,
  updateOrder,
} from "../controllers/orderControllers";

const orderRouter = express.Router();

orderRouter.post("/add", verifyToken, newOrder);
orderRouter.put("/update/:id", verifyTokenAndAdmin, updateOrder);
orderRouter.delete("delete/:id", verifyTokenAndAdmin, deleteOrder);
orderRouter.get("/userorders/:id", verifyTokenAndAuthorization, getUserOrders);
orderRouter.get(
  "/latestorder/:id",
  verifyTokenAndAuthorization,
  getlatestUserOrder
);
orderRouter.get("/allorders", verifyTokenAndAdmin, getAllOrders);
orderRouter.get("/getincome", verifyTokenAndAdmin, getIncome);

export default orderRouter;
