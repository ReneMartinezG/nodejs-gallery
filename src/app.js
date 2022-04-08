/*jshint esversion: 6 */
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const exphbs = require("express-handlebars");

//Initializations
const app = express();
require("./database.js");

//Settings
app.set("port",process.env.PORT || 3000);
app.set("views", path.join(__dirname,"views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main.hbs",
    layoutsDir: path.join(app.get("views"),"layouts"),
    partialsDir: path.join(app.get("views"),"partials"),
    extname: ".hbs"
}));
app.set("view engine",".hbs");

// //Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const storageMulter = multer.diskStorage({
    destination: path.join(__dirname,"public/uploads"),
    filename: (req,file,cb)=>{
        cb(null,new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage: storageMulter
}).single("image"));

//Routes
app.use(require("./router/index.router.js"));
//Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;