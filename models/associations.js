import FurnitureMaterial from "./Furniture-Material.js";
import Furniture from "./Furniture.js";
import Material from "./Materials.js";

Furniture.belongsToMany(Material, { through: FurnitureMaterial });

Material.belongsToMany(Furniture, { through: FurnitureMaterial });