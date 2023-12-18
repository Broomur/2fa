import mongoose from "./index.js";

const Materials = mongoose.model("Materials", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    provider: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false,
        default: 0
    }
}));

export default Materials;