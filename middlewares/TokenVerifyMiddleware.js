import TokenBlackList from "../models/TokenBlackList.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const TokenVerifyMiddleware = async (req, res, next) => {
    if (req.cookies.access) {
        try {
            const decodedToken = jwt.verify(req.cookies.access, process.env.SERVER_SECRET);
            const isBlackListed = await TokenBlackList.findOne({ where: { token: req.cookies.access } });
            if (isBlackListed !== null) res.status(401).json({ message: false });
            req.userId = decodedToken.userID;
            next();
        } catch (error) {
            res.status(401).json({ message: false });
        }
    }
    else {
        res.status(401).json({ message: false });
    }
}

export default TokenVerifyMiddleware;