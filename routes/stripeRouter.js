import express from "express";
import { stripePayment } from "../controllers/stripeControllers";
const stripeRouter = express.Router();

stripeRouter.post("/payment", stripePayment);

export default stripeRouter;
