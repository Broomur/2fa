import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_HOST, MONGO_PORT, MONGO_NAME, MONGO_USER, MONGO_PASSWORD } = process.env;

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?directConnection=true`, {
    connectTimeoutMS: 30000,
    authSource: "admin"
});

export default mongoose;