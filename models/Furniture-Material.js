import sequelize from "./index.js";
import { DataTypes } from "sequelize";

const FurnitureMaterial = sequelize.define("FurnitureMaterial", {
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
    }
});

export default FurnitureMaterial;