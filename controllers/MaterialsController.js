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
                    "category",
                    "provider",
                    "price",
                    [
                        fn("SUM", col("furniture-materials.quantity")),
                        "totalQuantity",
                    ],
                    [
                        fn("ARRAY_AGG", col("furniture-materials.furnitureId")),
                        "furnitureIds",
                    ]
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
