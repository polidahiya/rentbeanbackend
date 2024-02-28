const express = require("express");
const router = express.Router();
const connectToMongo = require("./mongo");
const verifyToken=require("./verifytoken")

// get all orders
router.get("/orders",verifyToken, async (req, res) => {
  try {
    const { orders } = await connectToMongo();

    const order = await orders
      .find({ completed: false })
      .sort({ date: 1 })
      .toArray();
    res.status(200).send(order);
  } catch (error) {
    console.error("Failed", error);
    res.status(500).send("Failed");
  }
});
// get completed orders
router.post("/completedorders",verifyToken, async (req, res) => {
  try {
    const { orders } = await connectToMongo();
    const order = await orders
      .find({ completed: true })
      .sort({ date: -1 })
      .skip(req.body.skip)
      .limit(10)
      .toArray();
    res.status(200).send(order);
  } catch (error) {
    console.error("Failed", error);
    res.status(500).send("Failed");
  }
});
// set verified
router.post("/setverified",verifyToken, async (req, res) => {
  try {
    const { orders } = await connectToMongo();
    const { ObjectId } = await connectToMongo();
    const order = await orders.updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          verified: true,
        },
      }
    );
    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).send("Failed");
  }
});
// set un verified
router.post("/setunverified",verifyToken, async (req, res) => {
  try {
    const { orders } = await connectToMongo();
    const { ObjectId } = await connectToMongo();
    const order = await orders.updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          verified: false,
        },
      }
    );
    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).send("Failed");
  }
});
// set completed
router.post("/setcompleted",verifyToken, async (req, res) => {
  try {
    const { orders } = await connectToMongo();
    const { ObjectId } = await connectToMongo();
    const order = await orders.updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          completed: true,
        },
      }
    );
    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).send("Failed");
  }
});
// set un verified
router.post("/setnotcompleted",verifyToken, async (req, res) => {
  try {
    const { orders } = await connectToMongo();
    const { ObjectId } = await connectToMongo();
    const order = await orders.updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          completed: false,
        },
      }
    );
    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).send("Failed");
  }
});
module.exports = router;
