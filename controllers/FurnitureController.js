import Furniture from "../models/Furniture.js";
import Materials from "../models/Materials.js";

const FurnitureController = async (req, res) => {
    if (req.method === "GET") {
        if (Object.keys(req.query).length) {
            const query = Object.keys(req.query);
            const materials = await Materials.find({ "name": { $in: query } } ).select("id");
            const furniture = await Furniture.find({ "components.material": { $in: materials } }).populate("materials.material");
            res.json({ furniture });
        } else {
            const furniture = await Furniture.find().populate("components.material");
            res.json({ furniture });
        }
    } else if (req.method === "POST") {
        const { name, category, components, description, pictures, price, quantity } = req.body;
        try {
            components.map(async component => {
                console.log(component.material)
                const material = await Materials.findById(component.material);
                console.log(material);
            })
            console.log(components)
            await Furniture.create({
                name,
                category,
                components,
                description,
                pictures,
                price,
                quantity
            });
            res.json({ message: "furniture created" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    } else if (req.method === "PUT") {
        const { name, category, materials, description, pictures, price, quantity } = req.body;
        try {
            const db_materials = (await Materials.find({ name: { $in: materials.map(material => material.material) } }).select("id")).map(item => item._id);
            const furniture = await Furniture.findByIdAndUpdate(
                req.path.split("/")[2],
                {
                    name,
                    category,
                    components: db_materials,
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
    } else if (req.method === "DELETE") {
        try {
            await Furniture.findByIdAndDelete(req.path.split("/")[2]);
            res.json({ message: "furniture deleted" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    }
}

export default FurnitureController;