import mongoose from "./index.js";

const TokenBlackList = mongoose.model("TokenBlackList", new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}));

export default TokenBlackList;