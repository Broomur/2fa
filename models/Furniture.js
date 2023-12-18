import mongoose from "./index.js";

const Schema = mongoose.Schema;

const Furniture = mongoose.model("Furniture", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["étagère", "armoire"],
        required: true
    },
    materials: {
        type: [String],
        enum: ["chêne", "frêne", "noyer", "acier", "inox", "aluminium", "plastique"],
        ref: "Materials",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pictures: {
        type: [String],
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: new Date().toDateString()
    }
}));

export default Furniture;