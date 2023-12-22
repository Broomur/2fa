import express from "express";
import MaterialsController from "../controllers/MaterialsController.js";
import TokenVerifyMiddleware from "../middlewares/TokenVerifyMiddleware.js";

const materialsRoutes = express.Router();

materialsRoutes.all("/materials", MaterialsController);

export default materialsRoutes;