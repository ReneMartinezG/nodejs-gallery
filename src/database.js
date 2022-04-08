/*jshint esversion: 6 */
const mongoose = require("mongoose");

const uri = process.env.DB+"://"+process.env.HOST+"/"+process.env.DB_NAME;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection failed"));
db.once("open", function callback(){
    console.log("DB Connection successful!!!");
});

module.exports = db;
