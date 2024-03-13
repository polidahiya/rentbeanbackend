const express = require("express");
const app = express();
const multer = require("multer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 3005;
app.listen(port);
//
console.log("listening");
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./pages"));
app.use("/data", require("./data"));
app.use("/placeorder", require("./makeorder"));
app.use("/admin", require("./adminroute"));

//update password
const connectToMongo = require("./mongo");
const verifyToken = require("./verifytoken");
app.post("/updatepassword", verifyToken, async (req, res) => {
  try {
    const { data } = await connectToMongo();
    data.findOne({ email: "admin@vishal.com" }).then((user) => {
      if (user.password == req.body.cpass) {
        data.updateOne(
          { email: "admin@vishal.com" },
          { $set: { password: req.body.npass } }
        );
        res.json({
          message: "passupdated",
        });
      } else {
        res.json({
          message: "wrongpass",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
//login
app.post("/login", async (req, res) => {
  try {
    const { data } = await connectToMongo();
    data.findOne({ email: "admin@vishal.com" }).then((user) => {
      if (user) {
        if (user.password == req.body.password) {
          const token = jwt.sign(
            { userId: "admin@vishal.com" },
            "this-world-is-toxic",
            {
              expiresIn: "24h",
            }
          );
          res.cookie(`token`, token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, //one days
          });
          res.cookie(`logedin`, true, {
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, //one days
          });
          res.status(200).json({ message: "true", token });
        } else {
          res.json({
            message: "Incorrect password",
          });
        }
      } else {
        res.json({
          message: "User not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
// logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("logedin");
  res.json({
    message: "logedout",
  });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("notfound.ejs");
});
//
//
// site spy
// get previewdata
// app.get("/data", verifyToken, async (req, res) => {
//   try {
//     data.updateOne({}, { $inc: { totalvisits: 1 } }, { upsert: true });
//     let result = await data.findOne({});
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//   }
// });
