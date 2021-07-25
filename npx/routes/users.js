var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://openlegacy_qa:test1234@clusterqa.gkj5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://openlegacy_qa:test1234@clusterqa.gkj5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

/* GET users listing. */
router.get("/", async function (req, res, next) {
  client.connect(async (err) => {
    const collection = client.db("test").collection("currentRun");
    // // perform actions on the collection object

    console.log(
      collection.find({
        _id: ObjectId("60fd6c593454f03371d7769f"),
      })
    );

    // const insertResult = await collection.insertOne({ student });
    // console.log("Inserted documents =>", student);
    client.close();
  });
});

module.exports = router;
