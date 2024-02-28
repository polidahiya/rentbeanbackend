const express = require("express");
const router = express.Router();
const connectToMongo = require("./mongo");

router.post("/", async (req, res) => {
  try {
    const { product, location, userdata } = req.body;
    const { orders } = await connectToMongo();
    await orders.insertOne({
      verified: false,
      completed: false,
      product: product,
      location: location,
      userdata: userdata,
      date: Date.now(),
    });
    res.json({ message: "done" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
});

module.exports = router;
