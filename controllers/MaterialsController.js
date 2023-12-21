import Material from "../models/Materials.js";
import FurnitureMaterial from "../models/Furniture-Material.js";
import { fn, col } from "sequelize";
import "../models/associations.js";

const MaterialsController = async (req, res) => {
    if (req.method === "GET") {
        try {
            const materials = await Material.findAll({
                attributes: [
                    "id",
                    "name",
                    "description",
                    [
                        fn("SUM", col("furniture-materials.quantity")),
                        "totalQuantity",
                    ],
                ],
                include: [
                    {
                        model: FurnitureMaterial,
                        attributes: [],
                    },
                ],
                group: ["materials.id"],
            });
            if (materials) res.json({ materials });
            else res.status(404).json({ message: "no data found" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    }
};

export default MaterialsController;
