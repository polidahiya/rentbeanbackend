const { MongoClient, ObjectId } = require("mongodb");

const db_link = process.env.mongolink;

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
