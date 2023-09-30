import nodemailer from "nodemailer";
import express from "express";

const contactRouter = express.Router();

// sending mail to the client

contactRouter.post("/contact/:id", (req, res) => {
  const { products } = req.body;
  const userId = req.params.id;
  console.log(userId);

  const smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "kavyawhale777@gmail.com",
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: userId, // Set your 'from' email address
    to: "kavyawhale777@gmail.com",
    subject: `message from ${userId}`,
    html: `
      <h2>Latest Purchase</h2>
      <h3>Informations<h3/>
      <ul>
        ${products
          .map(
            (product) => `
          <li>ProductId: ${product._id}</li>
          <li>Title: ${product.title}</li>
          <li>Price: ${product.price}</li>
          <li>Size: ${product.size}</li>
          <li>Color: ${product.color}</li>
          <li>Categories: ${product.categories}</li>
         
        `
          )
          .join("")}
      </ul>
    `,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    try {
      // Close the SMTP transporter
      smtpTransporter.close();

      if (error) return res.status(400).json({ msg: "Error occurred!" });
      res.status(200).json({ msg: "Thank You For purchasing." });
    } catch (error) {
      if (error)
        return res.status(500).json({ msg: "There is a server error" });
    }
  });
});

export default contactRouter;
