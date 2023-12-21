import Furniture from "./Furniture.js";
import FurnitureMaterial from "./Furniture-Material.js";
import Material from "./Materials.js";

FurnitureMaterial.belongsTo(Furniture, { foreignKey: 'furnitureId'});
FurnitureMaterial.belongsTo(Material, { foreignKey: 'materialId'});

Furniture.hasMany(FurnitureMaterial);
Material.hasMany(FurnitureMaterial);


Furniture.belongsToMany(Material, { 
    through: FurnitureMaterial,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "furnitureId",
});
Material.belongsToMany(Furniture, {
    through: FurnitureMaterial,
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
    foreignKey: "materialId"
});