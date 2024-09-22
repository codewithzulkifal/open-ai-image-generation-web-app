import mongoose, { mongo } from "mongoose";


const connectDB = (url) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url).then(() => (
        console.log("MongoDB connected succesFully")
    )).catch((err) => (
        console.log(err)
    ))

}

export default connectDB