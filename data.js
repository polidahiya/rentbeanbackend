const express = require("express");
const router = express.Router();
const connectToMongo = require("./mongo");
const verifyToken = require("./verifytoken");

router.get("/", async (req, res) => {
  const { sitedata } = await connectToMongo();
  let data = await sitedata.findOne({});
  res.send(data.data);
});
router.post("/updateproduct", verifyToken, async (req, res) => {
  const { sitedata } = await connectToMongo();
  let tochange = "data.Fitness and Gym.subcat.Treadmill.products.0.available";
  await sitedata.updateOne(
    {},
    {
      $set: {
        [tochange]: 0,
      },
    }
  );
});
router.post("/deletedata", verifyToken, async (req, res) => {
  const { sitedata } = await connectToMongo();
  let tochange = "data.hi";
  await sitedata.updateOne(
    {},
    {
      $unset: {
        [tochange]: "",
      },
    }
  );
});

module.exports = router;

// to update  'data.Fitness and Gym.subcat.Treadmill.products.0.available': 0,
