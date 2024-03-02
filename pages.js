const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static("./public"));

router.get("/", (req, res) => {
  res.render("index.ejs");
});
router.get("/cart", (req, res) => {
  res.render("cart.ejs");
});
router.get("/categorypage", (req, res) => {
  res.render("categorypage.ejs");
});
router.get("/productpage", (req, res) => {
  let product = getproduct(req.query.p);
  res.render("productpage.ejs", { product: product });
});
router.get("/subcategory", (req, res) => {
  res.render("subcategory.ejs");
});
router.get("/admin", (req, res) => {
  res.render("admin.ejs");
});
router.get("/aboutus", (req, res) => {
  res.render("aboutus.ejs");
});
router.get("/contactus", (req, res) => {
  res.render("contactus.ejs");
});
router.get("/decumentsrequired", (req, res) => {
  res.render("decumentsrequired.ejs");
});
router.get("/shippingpolicy", (req, res) => {
  res.render("shippingpolicy.ejs");
});
router.get("/cancelationandreturnpolicy", (req, res) => {
  res.render("cancelationandreturnpolicy.ejs");
});
router.get("/privacypolicy", (req, res) => {
  res.render("privacypolicy.ejs");
});

function getdata() {
  try {
    const jsonData = fs.readFileSync("./public/data.json", "utf8");
    const data = JSON.parse(jsonData);
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
  }
}
function getproduct(proid) {
  let productdata;
  try {
    const jsonData = fs.readFileSync("./public/data.json", "utf8");
    const data = JSON.parse(jsonData);
    for (const key in data) {
      for (const subcat in data[key]["subcat"]) {
        data[key]["subcat"][subcat].products.forEach((product) => {
          if (product.pid == proid) {
            productdata = product;
          }
        });
      }
    }
    return productdata;
  } catch (err) {
    console.error("Error reading file:", err);
    productdata = "";
    return productdata;
  }
}
module.exports = router;
