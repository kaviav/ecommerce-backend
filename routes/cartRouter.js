import express from "express";
import {
  deleteCart,
  getCart,
  getCarts,
  newCart,
  updateCart,
} from "../controllers/cartControllers";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken";

const cartRouter = express.Router();

//user can create the cart hence verifytoken
cartRouter.post("/add", verifyToken, newCart);
cartRouter.put("/update/:id", verifyTokenAndAuthorization, updateCart);
cartRouter.delete("delete/:id", verifyTokenAndAuthorization, deleteCart);
cartRouter.get("/getcart/:userId", verifyTokenAndAuthorization, getCart);
cartRouter.get("/getallcart", verifyTokenAndAdmin, getCarts);

export default cartRouter;
