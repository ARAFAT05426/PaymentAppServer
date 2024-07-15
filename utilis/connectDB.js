import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let db = client.db("chatify");
const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

export { db, connectDB };