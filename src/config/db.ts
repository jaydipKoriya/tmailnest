import mongoose from "mongoose";
import { logger } from "../utils";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("MongoDB connected");
    } catch (error) {
        logger.error(error);
    }
}

