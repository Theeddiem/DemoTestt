var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://openlegacy_qa:test1234@clusterqa.gkj5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const fs = require("fs");

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/tests", usersRouter);

client.connect(async (err) => {
  // let rawdata = fs.readFileSync("extent.json");
  // let suite = JSON.parse(rawdata);
  // const collection = client.db("test").collection("currentRun");
  // // perform actions on the collection object
  // const insertResult = await collection.insertOne({ student });
  // console.log("Inserted documents =>", student);
  client.close();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
