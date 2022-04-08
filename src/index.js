/*jshint esversion: 6 */
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const app = require("./app.js");


app.listen(app.get("port"),(req,res)=>{
    console.log(`Server on port ${app.get("port")}`);
    console.log("EnviRonment: "+process.env.NODE_ENV);
});

