import Furniture from "../models/Furniture.js";
import Material from "../models/Materials.js";
import FurnitureMaterial from "../models/Furniture-Material.js";
import { Op } from "sequelize";
import "../models/associations.js";

const FurnitureController = async (req, res) => {
    if (req.method === "GET") {
        if (/\/furniture\/cupboard|shelf/.test(req.path)) {
            const category = req.path.split("/")[2];
            try {
                const furnitureData = await Furniture.findAll({
                    where: { category: category },
                    include: Material,
                });
                if (furnitureData) {
                    const furniture = furnitureData.map((furniture) => ({
                        name: furniture.name,
                        id: furniture.id,
                        category: furniture.category,
                        description: furniture.description,
                        price: furniture.price,
                        quantity: furniture.quantity,
                        date: furniture.date,
                        materials: furniture.materials.map((material) => ({
                            name: material.name,
                            type: material.category,
                            id: material.id,
                            provider: material.provider,
                            price: material.price,
                            description: material.description,
                            quantity:
                                material["furniture-material"]?.quantity || 0,
                        })),
                    }));
                    res.json({ furniture });
                } else {
                    res.status(404).json({ message: "no data found" });
                }
            } catch (error) {
                res.status(500).json({ message: "error server" });
            }
        } else if (/\/furniture\/\d+/.test(req.path)) {
            const furnitureId = req.path.split("/")[2];
            try {
                console.log(furnitureId);
                const furnitureData = await Furniture.findOne({
                    where: { id: furnitureId },
                    include: Material,
                });
                if (furnitureData) {
                    const furniture = {
                        name: furnitureData.name,
                        id: furnitureData.id,
                        category: furnitureData.category,
                        description: furnitureData.description,
                        price: furnitureData.price,
                        quantity: furnitureData.quantity,
                        date: furnitureData.date,
                        materials: furnitureData.materials.map((material) => ({
                            name: material.name,
                            type: material.category,
                            id: material.id,
                            provider: material.provider,
                            price: material.price,
                            description: material.description,
                            quantity:
                                material["furniture-material"]?.quantity || 0,
                        })),
                    };
                    res.json({ furniture });
                } else {
                    res.status(404).json({ message: "no data found" });
                }
            } catch (error) {
                res.status(500).json({ message: "error server" });
            }
        } else {
            if (Object.keys(req.query).length) {
                const query = Object.keys(req.query);
                try {
                    const furnitureData = await Furniture.findAll({
                        include: {
                            model: Material,
                            through: { attributes: [] },
                            where: {
                                name: {
                                    [Op.in]: query,
                                },
                            },
                        },
                    });
                    if (furnitureData) {
                        const furniture = furnitureData.map((furniture) => ({
                            name: furniture.name,
                            id: furniture.id,
                            category: furniture.category,
                            description: furniture.description,
                            price: furniture.price,
                            quantity: furniture.quantity,
                            date: furniture.date,
                            materials: furniture.materials.map((material) => ({
                                name: material.name,
                                type: material.category,
                                id: material.id,
                                provider: material.provider,
                                price: material.price,
                                description: material.description,
                                quantity:
                                    material["furniture-material"]?.quantity ||
                                    0,
                            })),
                        }));

                        res.json({ furniture });
                    } else {
                        res.status(404).json({ message: "no data found" });
                    }
                } catch (error) {
                    res.status(500).json({ message: "error server" });
                }
            } else {
                try {
                    const furnitureData = await Furniture.findAll({
                        include: Material,
                    });
                    if (furnitureData) {
                        const furniture = furnitureData.map(
                            (furnitureItem) => ({
                                name: furnitureItem.name,
                                id: furnitureItem.id,
                                category: furnitureItem.category,
                                description: furnitureItem.description,
                                price: furnitureItem.price,
                                quantity: furnitureItem.quantity,
                                date: furnitureItem.date,
                                materials: furnitureItem.materials.map(
                                    (material) => ({
                                        name: material.name,
                                        type: material.category,
                                        id: material.id,
                                        provider: material.provider,
                                        price: material.price,
                                        description: material.description,
                                        quantity:
                                            material["furniture-material"]
                                                ?.quantity,
                                    })
                                ),
                            })
                        );
                        res.json({ furniture });
                    } else {
                        res.status(404).json({ message: "no data found" });
                    }
                } catch (error) {
                    res.status(500).json({ message: "error server" });
                }
            }
        }
    } else if (req.method === "POST") {
        const {
            name,
            category,
            components,
            description,
            pictures,
            price,
            quantity,
        } = req.body;

        try {
            const createdFurniture = await Furniture.create({
                name,
                category,
                description,
                pictures,
                price,
                quantity,
            });

            const componentPromises = components.map(async (component) => {
                const { material: materialId, quantity: componentQuantity } =
                    component;
                const material = await Material.findByPk(materialId);

                if (material) {
                    await FurnitureMaterial.create({
                        furnitureId: createdFurniture.id,
                        materialId: material.id,
                        quantity: componentQuantity,
                    });
                }
            });

            await Promise.all(componentPromises);

            res.json({ message: "furniture created" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    } else if (req.method === "PUT") {
        const id = req.path.split("/")[2];
        const {
            name,
            category,
            components,
            description,
            pictures,
            price,
            quantity,
        } = req.body;
        try {
            await Furniture.update(
                { name, category, description, pictures, price, quantity },
                { where: { id: id } }
            );
            if (components) {
                await FurnitureMaterial.destroy({ where: { furnitureId: id } });
                components.forEach(async (elem) => {
                    await FurnitureMaterial.upsert(
                        {
                            furnitureId: id,
                            materialId: elem.material,
                            quantity: elem.quantity,
                        },
                        {
                            where: {
                                furnitureId: id,
                                materialId: elem.material,
                            },
                        }
                    );
                });
            }

            res.json({ message: "furniture updated" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    } else if (req.method === "DELETE") {
        try {
            await Furniture.destroy({ where: { id: req.path.split("/")[2] } });
            res.json({ message: "furniture deleted" });
        } catch (error) {
            res.status(500).json({ message: "error server" });
        }
    }
};

export default FurnitureController;
