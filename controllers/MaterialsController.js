import Material from "../models/Materials.js";
import FurnitureMaterial from "../models/Furniture-Material.js";
import { fn, col } from "sequelize";
import "../models/associations.js";

const MaterialsController = async (req, res) => {
    if (req.method === "GET") {
        const materials = await Material.findAll({
            attributes: [
                "id",
                "name",
                "description",
                [fn("SUM", col("furniture-materials.quantity")), "totalQuantity"]
            ],
            include: [
                {
                  model: FurnitureMaterial,
                  attributes: [],
                },
              ],
            group: ["materials.id"],
        });
        res.json({ materials });
    }
};

export default MaterialsController;
