import express from "express";
import FurnitureController from "../controllers/FurnitureController.js";
import TokenVerifyMiddleware from "../middlewares/TokenVerifyMiddleware.js";

const furnitureRoutes = express.Router();

furnitureRoutes.get("/furniture", FurnitureController);
furnitureRoutes.post("/furniture", TokenVerifyMiddleware, FurnitureController);
furnitureRoutes.put("/furniture", TokenVerifyMiddleware, FurnitureController);
furnitureRoutes.delete("/furniture", TokenVerifyMiddleware, FurnitureController);

export default furnitureRoutes;