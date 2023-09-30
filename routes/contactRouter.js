import express from "express";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken";
import { sendMail } from "../controllers/contactController";

const contactRouter = express.Router();

// sending mail to the client

contactRouter.post("/contact/:id", verifyTokenAndAuthorization, sendMail);

export default contactRouter;
