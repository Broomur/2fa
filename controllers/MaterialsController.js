import Furniture from "../models/Furniture.js";
import Materials from "../models/Materials.js";

const MaterialsController = async (req, res) => {
    if (req.method === "GET") {
        if (req.path === "/materials") {
            const materials = await Materials.find();
            res.json({ materials });
        } else if (req.path === "/materials/count") {
            const materials = await Furniture.aggregate([
            { $unwind: "$components" },
            { $group: { _id: "$components.material", count: { $sum: "$components.quantity" } } },
            /* { $lookup: {
                from: "materials",
                localField: "material",
                foreignField: "_id",
                as: "materialDetails",
                },
            },
            { $project: {
                    _id: 0,
                    name: "$materialDetails",
                    count: 1,
                },
            }, */
        ]);

        (await Materials.find().select("name"))
            .map(elem => elem.name)
            .filter(elem => {
                return materials.every(mat => mat.name !== elem);
            })
            //.forEach(elem => materials.push({ count: 0, name: elem }));


        res.json({ materials });
        }
        
          
          
    } else if (req.method === "POST") {
        const { name, category, quantity, provider, price } = req.body;
        try {
            await Materials.create({
                name,
                category,
                quantity,
                provider,
                price
            });
            res.json({ message: "materials created" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    } else if (req.method == "PUT") {
        const { name, category, quantity, provider, price } = req.body;
        try {
            const materials = await Materials.findByIdAndUpdate(
                req.path.split("/")[2],
                {
                    name,
                    category,
                    quantity,
                    provider,
                    price
                },
                { new: true }
            );
            res.json({ message: "materials updated", materials})
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    } else if (req.method === "DELETE") {
        try {
            await Materials.findByIdAndDelete(req.path.split("/")[2]);
            res.json({ message: "materials deleted" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    }
}

export default MaterialsController;
