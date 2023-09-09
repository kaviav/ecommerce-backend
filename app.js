import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import productRouter from "./routes/productRouter";
import cartRouter from "./routes/cartRouter";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

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
