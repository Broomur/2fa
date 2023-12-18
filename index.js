import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";

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
.use(authRoutes)
.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Listening on http://${SERVER_HOST}:${SERVER_PORT}`);
})