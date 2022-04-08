/*jshint esversion: 8 */
const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2; 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const fs = require("fs-extra");

const photo = require("../models/photo.js");

router.get("/",async (req, res) => {
  const readPhotos = await photo.find().lean();
  console.log(readPhotos);
  res.render("image.hbs",{photos:readPhotos});
  
});

router.get("/images/add", async (req, res) => {
  const readPhotos = await photo.find().lean();
  res.render("image_form.hbs",{photos:readPhotos});
});

router.post("/images/add",async (req, res)=>{
    console.log(req.body);  
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const newPhoto = new photo({
      title: req.body.title,
      description: req.body.description,
      imageURL: result.url,
      public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.redirect("/");
});

router.get("/image/delete/:photo_id", async (req,res)=>{
  const photoID = req.params.photo_id;
  const  photoDelete = await photo.findByIdAndDelete(photoID);
  const result = await cloudinary.uploader.destroy(photoDelete.public_id);
  console.log(result);
  res.redirect("/images/add");
});
    

module.exports = router;
