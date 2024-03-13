const { MongoClient, ObjectId } = require("mongodb");

const db_link =
  "mongodb+srv://polidahiya830:12er56ui90%40Poli@cluster0.pvrgiqn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(db_link);

module.exports = async function connectToMongo() {
  try {
    await client.connect();
    const db = client.db("rentbeen");
    const data = db.collection("data");
    const orders = db.collection("orders");
    const sitedata = db.collection("sitedata");
    return { data, orders, sitedata, ObjectId };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
