import TokenBlackList from "../models/TokenBlackList.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const TokenVerifyMiddleware = async (req, res, next) => {
    if (req.cookies.access) {
        try {
            jwt.verify(req.cookies.access, process.env.SERVER_SECRET);
        } catch (error) {
            res.status(401).json({ message: "unauthorized" });
        }
        const isBlackListed = await TokenBlackList.find({ token: req.cookies.access });
        if (isBlackListed.length) res.status(401).json({ message: "unauthorized" });
        else next();
    }
    else {
        res.status(401).json({ message: "unauthorized" });
    }
}

export default TokenVerifyMiddleware;