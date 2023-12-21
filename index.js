import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";
import furnitureRoutes from "./routes/FurnitureRoutes.js";
import materialsRoutes from "./routes/MaterialsRoutes.js";

dotenv.config();

const { SERVER_HOST, SERVER_PORT } = process.env;

const corsOptions = {
    origin: "http://127.0.0.1:4200",
    credentials: true,
    methods: "GET, HEAD? PUT, PATCH, POST, DELETE",
    optionSuccessStatus: 204,
}

const app = express()
.use(express.urlencoded({
    extended: false
}))
.use(express.json())
.use(cookieParse())
.use(cors(corsOptions))
.use(authRoutes)
.use(furnitureRoutes)
.use(materialsRoutes)
.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Listening on http://${SERVER_HOST}:${SERVER_PORT}`);
})