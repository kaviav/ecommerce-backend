import express from "express";
import { update } from "../controllers/userControllers";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken";

const userRouter = express.Router();

// api endpoint, middlewares, api or controller functn
userRouter.put("/update/:id", verifyTokenAndAuthorization, update); // http://localhost:5000/user/update/:id

// userRouter.get("/getone", (req, res) => {
//   res.send("welcome to userRouter");
// });

// userRouter.post("/postone", (req, res) => {
//   const username = req.body.username;
//   res.send("your username is " + username);
//   console.log(username);
// });
export default userRouter;
