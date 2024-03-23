const express = require("express");
const app = express();
const router = express.Router();
const connectToMongo = require("./mongo");

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
router.get("/productpage", async (req, res) => {
  let product = await getproduct(req.query.p);
  if (product) {
    res.render("productpage.ejs", { product: product });
  }else{
    res.render("notfound.ejs");
  }
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
async function getproduct(proid) {
  try {
    const { sitedata } = await connectToMongo();
    let data = await sitedata.findOne({});
    for (const key in data.data) {
      for (const subcat in data.data[key]["subcat"]) {
        const product = data.data[key]["subcat"][subcat].products.find(
          (product) => product.pid === proid
        );
        if (product) {
          return product;
        }
      }
    }
    return null;
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

// event planners
router.get("/eventplanner", (req, res) => {
  res.render("eventplanner/eventplanner.ejs");
});
router.get("/eventplanner/birthday", (req, res) => {
  res.render("eventplanner/birthday.ejs");
});


module.exports = router;
