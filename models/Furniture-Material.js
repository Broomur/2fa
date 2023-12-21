import Furniture from "./Furniture.js";
import Material from "./Materials.js";
import sequelize from "./index.js";
import { DataTypes } from "sequelize";

const FurnitureMaterial = sequelize.define("furniture-material", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    tableName: 'furnitureMaterials',
});

export default FurnitureMaterial;