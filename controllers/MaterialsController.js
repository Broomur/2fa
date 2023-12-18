import Furniture from "../models/Furniture.js";
import Materials from "../models/Materials.js";

const MaterialsController = async (req, res) => {
    if (req.method === "GET") {
        if (req.path === "/materials") {
            const materials = await Furniture.aggregate([
                { $unwind: "$materials" },
                { $group: { _id: "$materials", count: { $sum: 1 } } }
            ]);
            res.json({ materials });
        }
    }
}

export default MaterialsController;