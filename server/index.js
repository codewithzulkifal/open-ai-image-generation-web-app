import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./mongoDb/connect.js";
import postRoutes from "./routes/post.route.js";
import dalleRoutes from "./routes/dalle.route.js";


const app = express();

dotenv.config({
  path: "./env",
});

app.use(cors())

app.use(express.json({
    limit: '50mb'
}))

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.send("Response from DALL-E");
});


const startSever = async() => {
    
    try {
        const port = process.env.PORT
        connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
          console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
     console.log(`Connectrion failed or app is not listenoing ${error} `)   
    }
    
}

startSever()