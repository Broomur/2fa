import Furniture from "../models/Furniture.js";

const FurnitureController = async (req, res) => {
    if (req.method === "GET") {
        if (req.path === "/furniture") {
            if (Object.keys(req.query).length) {
                const query = Object.keys(req.query);
                const furniture = await Furniture.find({ materials: { $in: query } })
                res.json({ furniture });
            } else {
                const furniture = await Furniture.find();
                res.json({ furniture });
            }
        }
    } else if (req.method === "POST") {
        if (req.path === "/furniture") {
            const { name, category, materials, description, pictures, price, quantity } = req.body;
            try {
                await Furniture.create({
                    name,
                    category,
                    materials,
                    description,
                    pictures,
                    price,
                    quantity
                });
                res.json({ message: "furniture created" });
            } catch (error) {
                res.status(500).json({ message: "error server" });
            }
        }
    } else if (req.method === "PUT") {
        if (req.path === "/furniture") {
            const furnitureId = req.query.id;
            const { name, category, materials, description, pictures, price, quantity } = req.body;
            try {
                const furniture = await Furniture.findByIdAndUpdate(
                    furnitureId,
                    {
                        name,
                        category,
                        materials,
                        description,
                        pictures,
                        price,
                        quantity,
                    },
                    { new: true }
                );
                res.json({ message: "furniture updated", furniture });
            } catch (error) {
                res.status(500).json({ message: "error server" });
            }
        }
    } else if (req.method === "DELETE") {
        if (req.path === "/furniture") {
            const furnitureId = req.query.id;
            try {
                await Furniture.findByIdAndDelete(furnitureId);
                res.json({ message: "furniture deleted" });
            } catch (error) {
                res.status(500).json({ message: "error server" });
            }
        }
    }
}

export default FurnitureController;