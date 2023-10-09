import express from "express";
import {
  deleteUser,
  getAll,
  getUser,
  updateUser,
  userStats,
} from "../controllers/userControllers";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken";

const userRouter = express.Router();

// api endpoint, middlewares, api or controller functn
userRouter.put("/update/:id", verifyTokenAndAuthorization, updateUser); // http://localhost:5000/user/update/:id
userRouter.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);
userRouter.get("/getone/:id", verifyTokenAndAdmin, getUser);
userRouter.get("/getall", verifyTokenAndAdmin, getAll);
userRouter.get("/getstats", verifyTokenAndAdmin, userStats);

export default userRouter;

//
// userRouter.get("/getone", (req, res) => {
//   res.send("welcome to userRouter");
// });

// userRouter.post("/postone", (req, res) => {
//   const username = req.body.username;
//   res.send("your username is " + username);
//   console.log(username);
// });
