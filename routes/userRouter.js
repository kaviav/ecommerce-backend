import express from "express";
import { auth } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/auth", auth);

// userRouter.get("/getone", (req, res) => {
//   res.send("welcome to userRouter");
// });

// userRouter.post("/postone", (req, res) => {
//   const username = req.body.username;
//   res.send("your username is " + username);
//   console.log(username);
// });
export default userRouter;
