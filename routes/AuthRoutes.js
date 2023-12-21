import express from "express";
import AuthController from "../controllers/AuthController.js";
import TokenVerifyMiddleWare from "../middlewares/TokenVerifyMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController);
authRoutes.get("/logout", TokenVerifyMiddleWare, AuthController);
authRoutes.get("/me", TokenVerifyMiddleWare, AuthController);   

export default authRoutes;
