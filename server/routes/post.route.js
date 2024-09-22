import express from "express";
// import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";

// dotenv.config();

const router = express.Router();
router.route("/").get((req, res) => {
  res.status(200).json({ message: "post from DALL-E!" });
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


router.route("/").post(async (req, res) => {
 try {
   const {name, prompt, photo} = req.body
 
   const photoUrl = await cloudinary.uploader.upload(photo)
 
   const newPost = await Post.create({
     name,
     prompt,
     photo: photoUrl
   })
 
   res.status(200).json({
     message: "new Post is created",
     data: newPost
   });
 } catch (error) {
  res.status(500).json({message: ` error while creating a new post ${error}` , success: false})
 }

})

router.route("/").get(async(req, res) => {
  try {
    const post = await Post.findOne(
      prompt
    )
    res.status(200).json({
      message: "Post is find",
      data: post
    })

  } catch (error) {
    res.status(500).json({ message: `error while search or getting post${error}` , success:false })
  }
} )

export default router;
