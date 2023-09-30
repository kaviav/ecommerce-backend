import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import productRouter from "./routes/productRouter";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";
import stripeRouter from "./routes/stripeRouter";
import contactRouter from "./routes/contactRouter";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/checkout", stripeRouter);
app.use("/mail", contactRouter);

//
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("DBconnection successful");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT || 5000, () => {
  console.log(`server is listening to PORT ${PORT}`);
});

// or app.listen(process.env.PORT, () => {
//   console.log(`server is listening to PORT ${process.env.PORT}`);
// });
