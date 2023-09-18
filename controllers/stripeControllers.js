import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res) => {
  const { products } = req.body;

  const line_items = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: { name: product.title },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
};

// import Stripe from "stripe";
// import dotenv from "dotenv";

// // Load environment variables from a .env file
// dotenv.config();

// // Create a Stripe instance using your secret key from environment variables
// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Define a function to handle the Stripe payment
// export const stripePayment = async (req, res) => {
//   // Extract the "products" data from the request body
//   const { products } = req.body;

//   // Create a list of line items based on the "products" data
//   const line_items = products.map((product) => ({
//     price_data: {
//       currency: "inr",
//       product_data: { name: product.title },
//       unit_amount: product.price * 100,
//     },
//     quantity: product.quantity,
//   }));

//   try {
//     // Create a checkout session using the Stripe API
//     const session = await stripeInstance.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: line_items,
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     // Respond with the session ID to the client
//     res.json({ id: session.id });
//   } catch (error) {
//     // Handle errors and respond with an error message
//     console.error("An error occurred:", error);
//     res.status(500).json({ error: "Payment session creation failed" });
//   }
// };
