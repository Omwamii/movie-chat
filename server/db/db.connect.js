import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("successfully connected to db")
    } catch (error) {
        console.log("error connecting to db:" + error)
    }
}