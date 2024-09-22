import express from "express";
// import * as dotenv from "dotenv";
import {  OpenAI } from "openai";

// dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
// });

router.route("/img").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").post( async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // console.log(aiResponse.url)
    if (!aiResponse) {
      throw new Error('response from ai in Server is not given')
    }

    const image =  aiResponse.data[0].b64_json;
    console.log(image.url)
    res.status(200).json({
      photo: image
    })

  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send(`serverError while generating Image ${error?.message} || "Something went wrong`);
  }


})

export default router;
