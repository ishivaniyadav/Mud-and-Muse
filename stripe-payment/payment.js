const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// 👇 Serve files from stripe-payment folder
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Stripe backend running successfully");
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Empty cart" });
    }

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity || 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      // ✅ FULL URL (IMPORTANT)
      success_url: `${process.env.CLIENT_URL}/stripe-payment/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/stripe-payment/cancel.html`
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
